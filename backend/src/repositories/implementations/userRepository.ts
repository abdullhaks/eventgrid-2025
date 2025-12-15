import { inject, injectable } from "inversify";
import BaseRepository from "./baseRepository";
import { userDocument } from "../../entities/userEntity";
import { Model } from "mongoose";
import IUserRepository from "../interfaces/IUserRepository";


@injectable()
export default class UserRepository extends BaseRepository<userDocument> implements IUserRepository{
  constructor(@inject("userModel") _userModel: Model<userDocument>) {
    super(_userModel);
  }




};
