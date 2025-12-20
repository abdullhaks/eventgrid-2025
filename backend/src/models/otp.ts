import {Schema,model} from "mongoose";
import { otpDocument } from "../entities/otpEntity";

const otpSchema : Schema<otpDocument> = new Schema ({

    otp:{type: String, required:true},
    email: {type: String , required : true},
    createdAt: {type: Date , default: Date.now(),expires:240},

},{
    timestamps:{createdAt:true,updatedAt:true}
});

const Otp = model<otpDocument>("Otp",otpSchema);
export default Otp;