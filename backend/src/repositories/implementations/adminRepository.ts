import { inject,injectable } from "inversify";
import { adminDocument } from "../../entities/adminEntity";
import BaseRepository from "./baseRepository";
import { Model } from "mongoose";
import IAdminRepository from "../interfaces/IAdminRepository";


@injectable()
export default class AdminRepository extends BaseRepository<adminDocument> implements IAdminRepository {

    constructor(@inject("adminModel") _adminModle : Model<adminDocument>){
        super(_adminModle)
    };

    

}


