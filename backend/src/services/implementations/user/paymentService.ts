import { inject, injectable } from "inversify";
import { IBookingDocument } from "../../../entities/bookingEntity";
import IBookingRepository from "../../../repositories/interfaces/IBookingRepository"; 
import IPaymentService from "../../interfaces/user/IPaymentService"; 


@injectable()
export default class PaymentService implements IPaymentService {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository
  ) {}

 async createBooking(data: any): Promise<any> {
    const booking = await this._bookingRepository.create(data);
    return booking;
  }

}
