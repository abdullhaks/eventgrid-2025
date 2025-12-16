import { inject,injectable } from "inversify";
import IAdminPhotoAndvideoService from "../../interfaces/admin/IAdminPhotoAndvideoService";
import IPhotoAndVideoRepository from "../../../repositories/interfaces/IPhotoAndVideoRepository";

@injectable()

export default class AdminPhotoAndvideoService implements IAdminPhotoAndvideoService {
    constructor(
        @inject("IPhotoAndVideoRepository") private _photoAndVideoRepository : IPhotoAndVideoRepository ,
      
    ) {}

    public async getPhotoAndVideoServices(): Promise<any> {
        // Implement the logic to retrieve photo and video services
        try {
            // const services = await this.adminPhotoAndvideoService.getPhotoAndVideoServices();
            // return services;
        } catch (error) {
            throw new Error("Error retrieving photo and video services");
        }   
    }
}