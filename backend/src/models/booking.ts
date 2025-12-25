// src/models/userModel.ts
import { Schema, model } from 'mongoose';
import { IBookingDocument } from '../entities/bookingEntity'; 

const bookingSchema:Schema<IBookingDocument> = new Schema({

  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  payment: {
    amount: { type: Number, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    status: { type: String, required: true },
  },
  status: { type: String, default: 'booked' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});

const Booking = model<IBookingDocument>('Booking', bookingSchema);

export default Booking