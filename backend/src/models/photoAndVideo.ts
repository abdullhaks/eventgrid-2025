import { Schema,model } from "mongoose";
import { photoAndVideoDocument } from "../entities/photoAndVideo";

const photoAndVideoSchema:Schema<photoAndVideoDocument> = new Schema ({

    serviceBy: {type: String ,required : true },
    provider: {type: String ,required : true },
    location: {type: String ,required : true },
    services: {type: String ,required : true },
    contact:{type: String ,required : true },
    price: {type: String ,required : true },
    status: {type: Number ,required : true },
    referLink:{type: String},
    coverImage:{type: String ,required : true },

});

const PhotoAndVidoe = model<photoAndVideoDocument>('PhotoAndVideo',photoAndVideoSchema);

export default PhotoAndVidoe;