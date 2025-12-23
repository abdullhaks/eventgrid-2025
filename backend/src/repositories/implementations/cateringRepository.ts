import { inject,injectable } from "inversify";
import { cateringDocument } from "../../entities/cateringEntity"; 
import BaseRepository from "./baseRepository";
import { Model } from "mongoose";
import ICateringRepository from "../interfaces/ICateringRepository";


@injectable()
export default class CateringRepository extends BaseRepository<cateringDocument> implements ICateringRepository {

    constructor(@inject("cateringModel") _cateringModle : Model<cateringDocument>){
        super(_cateringModle)
    };

    

}


