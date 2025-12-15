
import { Document, Types } from "mongoose";

export interface IAdminDocument extends Document {

    _id: Types.ObjectId;
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profile: string,
    createdAt: Date;
    updatedAt: Date;
    
}
export interface adminDocument extends IAdminDocument {}
