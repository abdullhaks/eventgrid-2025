export interface userSignupRequestDto {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile?:string;
};


export interface otpVerifyRequestDto {
  email: string;
  otp: string;
} 

export interface userLoginRequestDto{
    emailOrPhone:string;
    password:string;
};


export interface IPreference{
  _id:string;
  name:string;
}