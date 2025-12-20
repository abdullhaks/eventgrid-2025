import BaseRepository from "./baseRepository";
import { IOtpDocument, otpDocument } from "../../entities/otpEntity";
import IOtpRepository from "../interfaces/IOtpRepository";
import { inject,injectable } from "inversify";
import { Model } from "mongoose";
import { HttpException } from "../../utils/http.exception";
import { HttpStatusCode } from "../../utils/enum";


@injectable()
export default class OtpRepository extends BaseRepository<otpDocument> implements IOtpRepository{
    
    constructor(@inject("otpModel") private _otpModel: Model<otpDocument>){
        super(_otpModel)
    };

      async findLatestOtpByEmail(email: string): Promise<IOtpDocument> {
 
      const otpRecord = await this._otpModel
        .findOne({ email })
        .sort({ createdAt: -1 });

        console.log("otp record" ,otpRecord);

      if (!otpRecord) {
        throw new HttpException(HttpStatusCode.BAD_REQUEST, 'Invalid otp', 'INVALID_CREDENTIALS');
      }
      return otpRecord;
   
  }
}