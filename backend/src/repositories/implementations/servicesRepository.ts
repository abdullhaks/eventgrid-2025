import { inject,injectable } from "inversify";
import { servicesDocument } from "../../entities/servicesEntity"; 
import BaseRepository from "./baseRepository";
import { Model } from "mongoose";
import IServicesRepository from "../interfaces/IServicesRepository";


@injectable()
export default class ServicesRepository extends BaseRepository<servicesDocument> implements IServicesRepository {

    constructor(@inject("servicesModle") _servicesModle : Model<servicesDocument>){
        super(_servicesModle)
    };

    

}


