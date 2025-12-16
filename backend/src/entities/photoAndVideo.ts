
import { Document, Types } from "mongoose";

export interface IPhotoAndVideoDocument extends Document {

    _id: Types.ObjectId;
    serviceName: string,
    provider: string,
    location: string,
    contact:string,
    price: string,
    status: number,

    createdAt: Date;
    updatedAt: Date;
    
}
export interface adminDocument extends IPhotoAndVideoDocument {}
