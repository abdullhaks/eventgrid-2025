export interface IPhotoAndVideoDocument {

    _id: string ;
    serviceName: string,
    providerName: string,
    location: string,
    description:string,
    contact:string,
    price: number,
    bookingPrice: number,
    status: number,
    referLink:string,
    coverImage:string,
    createdAt: Date;
    updatedAt: Date;
    
}