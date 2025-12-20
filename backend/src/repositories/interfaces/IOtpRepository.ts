import BaseRepository from "../implementations/baseRepository";
import { IOtpDocument } from "../../entities/otpEntity";

export default interface IOtpRepository extends BaseRepository<IOtpDocument> {
  findLatestOtpByEmail(email: string): Promise<IOtpDocument>;
}