import { Document, Types } from "mongoose";

export interface IUserDocument extends Document {

    _id: Types.ObjectId;
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    profile: string,
    isValidated:boolean
    createdAt: Date;
    updatedAt: Date;
    
}
export interface userDocument extends IUserDocument {}
