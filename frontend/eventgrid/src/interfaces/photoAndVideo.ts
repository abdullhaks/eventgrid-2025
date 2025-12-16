export interface IPhotoAndVideoDocument {

    _id: string | number;
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