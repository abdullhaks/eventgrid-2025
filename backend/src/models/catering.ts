import { Schema,model } from "mongoose";
import { cateringDocument } from "../entities/cateringEntity"; 
import { isNumberObject } from "util/types";

const cateringSchema:Schema<cateringDocument> = new Schema ({

    serviceName: {type: String ,required : true },
    chiefChef: {type: String ,required : true },
    location: {type: String ,required : true },
    contact:{type: String ,required : true },
    price: {type: Number ,required : true },
    bookingPrice: {type: Number ,required : true },
    description: {type: String ,required : true },
    // galleryImages: {type: [String]},
    createdAt: {type: Date , default: Date.now },
    uploadedAt: {type: Date , default: Date.now },
    status: {type: Number ,required : true },
    referLink:{type: String},
    coverImage:{type: String ,required : true },

});



const Catering = model<cateringDocument>('Catering',cateringSchema);

export default Catering;