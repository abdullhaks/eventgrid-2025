
import { Document, Types } from "mongoose";

export interface ICateringDocument extends Document {

    _id: Types.ObjectId;
    serviceName: string;
    chiefChef: string;
    location: string;
    price : number;
    bookingPrice : number;
    status: number;
    description: string;
    contact : string;
    referLink: string;
    coverImage: string;
    // galleryImages:string[];
    createdAt: Date;
    uploadedAt: Date;
    
}
export interface cateringDocument extends ICateringDocument {}
