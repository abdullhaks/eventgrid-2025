import { inject, injectable } from "inversify";
import { HttpStatusCode } from "../../../utils/enum";
import { Request, Response } from "express";
import IPaymentController from "../../interfaces/user/IPaymentController";
import Razorpay from "razorpay";
import { createHmac } from "crypto";
import IPaymentService from "../../../services/interfaces/user/IPaymentService";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

    const razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
    });

@injectable()
export default class PaymentController implements IPaymentController {
  constructor(
  @inject('IPaymentService') private _paymentService: IPaymentService
  ) {}

 async createPaymentOrder(req: Request, res: Response): Promise<void> {
    try {
      const { amount, serviceId, selectedDate,userId } = req.body;
     // Assuming authentication middleware sets req.user

      if (!userId) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "User not authenticated" });
        return;
      }

      const options = {
        amount, // in paisa
        currency: "INR",
        receipt: "receipt_" + Math.random().toString(36).substring(7),
        notes: { userId, serviceId, selectedDate },
      };

      const order = await razorpay.orders.create(options);

      console.log("created order is ",order);
      res.status(HttpStatusCode.OK).json(order);
    } catch (error: any) {
      console.error("createPaymentOrder error:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error creating PaymentOrder",
        error: error.message,
      });
    }
  }

 async verifyOrderPayment(req: Request, res: Response): Promise<void> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!RAZORPAY_KEY_SECRET) {

        console.error("Razorpay key secret is not defined");
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: "Razorpay configuration error" });
        return;
      }

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        console.log('expected sig i s',expectedSign);
        console.log('received sig is',razorpay_signature);


      if (razorpay_signature === expectedSign) {
        // Fetch order to get notes
        const order = await razorpay.orders.fetch(razorpay_order_id);

        if (!order.notes) {
          console.log('order notes not found');
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: "Razorpay configuration error" });
        return;
      }
        const { userId, serviceId, selectedDate } = order.notes;

        if (!selectedDate || typeof order.amount !== 'number') {

          console.log('issue in order notes data');

        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: "Razorpay configuration error" });
        return;
        }
        const bookingData = {
          userId,
          serviceId,
          date: new Date(selectedDate),
          payment: {
            amount: order.amount / 100, // Convert back to rupees
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            status: "paid",
          },
        };

        const booking = await this._paymentService.createBooking(bookingData);

        res.status(HttpStatusCode.OK).json({
          success: true,
          message: "Payment verified successfully",
          bookingId: booking._id,
        });
      } else {
        console.error("Payment signature mismatch");
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, error: "Invalid payment signature" });
      }
    } catch (error: any) {
      console.error("verifyOrderPayment error:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error verifying payment", error: error.message });
    }
  }


}
