import { Schema,model } from "mongoose";
import { servicesDocument } from "../entities/servicesEntity"; 


const servicesSchema:Schema<servicesDocument> = new Schema ({

    serviceName: {type: String ,required : true },
    providerName: {type: String ,required : true },
    serviceType: {type: String ,required : true },
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



const Services = model<servicesDocument>('Service',servicesSchema);

export default Services;