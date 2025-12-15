import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../../utils/jwt';
import { HttpStatusCode } from '../../../utils/enum';
import IAdminAuthService from '../../interfaces/admin/IAdminAuthService'; 
import { inject, injectable } from 'inversify';
import IUserRepository from '../../../repositories/interfaces/IUserRepository';
import { adminLoginRequestDto } from '../../../dto/adminDto';


@injectable()
export default class AdminAuthService implements IAdminAuthService {

constructor(
  @inject("IUserRepository") private _userRepository : IUserRepository ,
){};


  async loginUser(userData: adminLoginRequestDto): Promise<any> {
    console.log("user data from service....", userData);

    if (!userData.email || !userData.password) {
      throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Please provide all required fields",
        code: "MISSING_FIELDS",
      };
    }

    let existingUser = await this._userRepository.findOne({
      email: userData.email,
    });
    if (!existingUser) {
      existingUser = await this._userRepository.findOne({
        phone: userData.email,
      });
      if (!existingUser) {
        throw {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Invalid credentials",
          code: "INVALID_CREDENTIALS",
        };
      }
    }

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