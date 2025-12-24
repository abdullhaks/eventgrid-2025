export interface IServices {
  serviceName: string;
  providerName: string;
  serviceType:string;
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