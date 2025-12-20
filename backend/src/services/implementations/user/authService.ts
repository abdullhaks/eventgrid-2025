import bcrypt from 'bcryptjs';
import { otpVerifyRequestDto, userLoginRequestDto, userSignupRequestDto } from '../../../dto/userDto';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../../utils/jwt';
import { HttpStatusCode } from '../../../utils/enum';
import IAuthService from '../../interfaces/user/IAuthService';
import { inject, injectable } from 'inversify';
import IUserRepository from '../../../repositories/interfaces/IUserRepository';
import generateOtp from '../../../utils/helpers';
import IOtpRepository from '../../../repositories/interfaces/IOtpRepository';
import nodemailer from "nodemailer";
import { generateOtpMail } from '../../../utils/generateOtpMail';


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});


@injectable()
export default class AuthService implements IAuthService {

constructor(
  @inject("IUserRepository") private _userRepository : IUserRepository ,
  @inject("IOtpRepository") private _otpRepository : IOtpRepository,
){};


async signupUser(userData: userSignupRequestDto): Promise<any> {
  console.log("user data from service....", userData);

  if (!userData.email || !userData.password || !userData.confirmPassword || !userData.firstName || !userData.lastName || !userData.phone ) {
    throw {
      status: HttpStatusCode.BAD_REQUEST,
      message: "Please provide all required fields",
      code: "MISSING_FIELDS"
    };
  }

  if (userData.password !== userData.confirmPassword) {
    throw {
      status: HttpStatusCode.BAD_REQUEST,
      message: "Passwords do not match",
      code: "PASSWORD_MISMATCH"
    };
  }


  const existingUser = await this._userRepository.findOne({ email: userData.email });
  console.log("Existing user: ", existingUser);
  if (existingUser) {
    throw {
      status: HttpStatusCode.CONFLICT,
      message: "User already exists",
      code: "USER_EXISTS"
    };
  }

  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  
  const response = await this._userRepository.create(userData);

  console.log("user creation response is ",response);
  const {password,...rest} = response;

  const otp = generateOtp();

  await this._otpRepository.create({
    otp:otp,
    email:response.email
  }).then(()=>{
    console.log("otp created");
  })
  

   const mailOptions = generateOtpMail(response.email, otp, '2 minutes');
    console.log("Mail options: ", mailOptions);
    try {
      const result = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: ", error);
          throw new Error("Error sending email");
        }
        console.log("Email sent: ", info.response);
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in sending mail");
    }


    // const accessToken = generateAccessToken({
    //   id: response._id.toString(),
    //   role: "user",
    // });
    // const refreshToken = generateRefreshToken({
    //   id: response._id.toString(),
    //   role: "user",
    // });


  let newUser = {
    _id: response._id,
    firstName: response.firstName,
    lastName: response.lastName,
    phone: response.phone,
    email: response.email,
    profile: response.profile || "",
  }

  

  return {
    message: "Signup successful",
    user: newUser,
    // accessToken,
    // refreshToken
  };
};

async verifyOtp(verifyData: otpVerifyRequestDto): Promise<any> {
  if(!verifyData.email || !verifyData.otp){
     throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: "bad request",
        code: "MISSING_FIELDS",
      };
  };

  console.log('verify data is ...',verifyData);;
  

  const otpRecord = await this._otpRepository.findLatestOtpByEmail(verifyData.email);

    if (!otpRecord) {
      throw new Error("Invalid OTP or email");
    }

    const isOtpValid = otpRecord.otp === verifyData.otp;
    if (!isOtpValid) {
      throw new Error("Invalid OTP");
    }

    const validateUser = await this._userRepository.update({email:verifyData.email},{isValidated:true})
    if (!validateUser) {
      throw new Error("otp verification failed");
    }

    return { message: "OTP verified successfully" };

};



  async loginUser(userData: userLoginRequestDto): Promise<any> {
    console.log("user data from service....", userData);

    if (!userData.emailOrPhone || !userData.password) {
      throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Please provide all required fields",
        code: "MISSING_FIELDS",
      };
    }

    let existingUser = await this._userRepository.findOne({
      email: userData.emailOrPhone,
    });
    if (!existingUser) {
      existingUser = await this._userRepository.findOne({
        phone: userData.emailOrPhone,
      });
      if (!existingUser) {
        throw {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Invalid credentials",
          code: "INVALID_CREDENTIALS",
        };
      }
    }

    if(!existingUser.isValidated){

        const otp = generateOtp();

  await this._otpRepository.create({
    otp:otp,
    email:existingUser.email
  }).then(()=>{
    console.log("otp created");
  })
  

   const mailOptions = generateOtpMail(existingUser.email, otp, '2 minutes');
    console.log("Mail options: ", mailOptions);
    try {
      const result = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: ", error);
          throw new Error("Error sending email");
        }
        console.log("Email sent: ", info.response);
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in sending mail");
    }

      throw {
        status: HttpStatusCode.MOVED_PERMANENTLY,
        message: "Please verify your email before logging in",
        code: "EMAIL_NOT_VERIFIED",
      };
    };


    const isPasswordValid = await bcrypt.compare(
      userData.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Invalid credentials",
        code: "INVALID_CREDENTIALS",
      };
    }

    const accessToken = generateAccessToken({
      id: existingUser._id.toString(),
      role: "user",
    });
    const refreshToken = generateRefreshToken({
      id: existingUser._id.toString(),
      role: "user",
    });

    const { password, ...rest } = existingUser.toJSON();



    let newUser = {
      _id: rest._id,
      firstName: rest.firstName,
      lastName: rest.lastName,
      phone: rest.phone,
      email: rest.email,
      profile: rest.profile || ""
    };

    return {
      message: "Login successful",
      user: newUser,
      accessToken,
      refreshToken,
    };
  }


async getAccessToken(refreshToken: string): Promise<any> {
    // console.log("Refresh token from service: ", refreshToken);
    if (!refreshToken) {
      throw new Error("refresh token not found");
    }

    const verified = verifyRefreshToken(refreshToken);

    // console.log("is verified from refresh token auth service...",verified);

    if (!verified) {
      throw new Error("Invalid refresh token");
    }

    // console.log("verified is ", verified);
    const accessToken = generateAccessToken({
      id: verified.id,
      role: verified.role,
    });

    // console.log("new access token is ...............",accessToken);

    return { accessToken };
  };










}