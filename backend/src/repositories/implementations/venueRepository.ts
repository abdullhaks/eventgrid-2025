import { inject,injectable } from "inversify";
import { venueDocument } from "../../entities/venueEntity";
import BaseRepository from "./baseRepository";
import { Model } from "mongoose";
import IVenueRepository from "../interfaces/IVenueRepository";


@injectable()
export default class VenueRepository extends BaseRepository<venueDocument> implements IVenueRepository {

    constructor(@inject("venueModel") _venueModel : Model<venueDocument>){
        super(_venueModel)
    };

    

}


