export interface IVenue {
  propertyName: string;
  providerName: string;
  location: string;
  price : number;
  bookingPrice:number;
  status: number;
  description: string;
  contact : string;
  referLink: string;
  coverImage: string;
  galleryImages:string[];
  createdAt: Date;
  uploadedAt: Date;
}