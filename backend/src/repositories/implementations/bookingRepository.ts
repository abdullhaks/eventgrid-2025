import { inject, injectable } from "inversify";
import BaseRepository from "./baseRepository";
import { bookingDocument } from "../../entities/bookingEntity"; 
import { Model } from "mongoose";
import IBookingRepository from "../interfaces/IBookingRepository"; 


@injectable()
export default class BookingRepository extends BaseRepository<bookingDocument> implements IBookingRepository{
  constructor(@inject("bookingModel") _bookingModel: Model<bookingDocument>) {
    super(_bookingModel);
  }




};
