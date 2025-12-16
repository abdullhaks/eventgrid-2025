
import { Document, Types } from "mongoose";

export interface IPhotoAndVideoDocument extends Document {

    _id: Types.ObjectId;
    serviceBy: string,
    provider: string,
    location: string,
    services:string,
    contact:string,
    price: string,
    status: number,
    referLink:string,
    coverImage:string,
    createdAt: Date;
    updatedAt: Date;
    
}
export interface photoAndVideoDocument extends IPhotoAndVideoDocument {}
