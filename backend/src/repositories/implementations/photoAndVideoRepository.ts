import { inject,injectable } from "inversify";
import { photoAndVideoDocument } from "../../entities/photoAndVideo"; 
import BaseRepository from "./baseRepository";
import { Model } from "mongoose";
import IPhotoAndVideoRepository from "../interfaces/IPhotoAndVideoRepository";


@injectable()
export default class PhotoAndVideoRepository extends BaseRepository<photoAndVideoDocument> implements IPhotoAndVideoRepository {

    constructor(@inject("photoAndvidoeModel") _photoAndvidoeModle : Model<photoAndVideoDocument>){
        super(_photoAndvidoeModle)
    };

    

}


