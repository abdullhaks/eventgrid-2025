import { Schema,model } from "mongoose";
import { photoAndVideoDocument } from "../entities/photoAndVideo";
import { isNumberObject } from "util/types";

const photoAndVideoSchema:Schema<photoAndVideoDocument> = new Schema ({

    serviceName: {type: String ,required : true },
    providerName: {type: String ,required : true },
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



const PhotoAndVidoe = model<photoAndVideoDocument>('PhotoAndVideo',photoAndVideoSchema);

export default PhotoAndVidoe;