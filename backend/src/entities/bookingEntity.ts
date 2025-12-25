import {Document, Types } from "mongoose";

export interface IBookingDocument extends Document {

    _id: Types.ObjectId;
    userId: Types.ObjectId,
    serviceId: Types.ObjectId,
    date: Date,
    payment: {
    amount: number,
    razorpayOrderId: string,
    razorpayPaymentId: String,
    status: string
  },
    status: string,
    createdAt: Date;
    updatedAt: Date;
    
}
export interface bookingDocument extends IBookingDocument {}
