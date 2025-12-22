import { inject,injectable } from "inversify";
import IAdminPhotoAndvideoService from "../../interfaces/admin/IAdminPhotoAndvideoService";
import IPhotoAndVideoRepository from "../../../repositories/interfaces/IPhotoAndVideoRepository";
import { IPhotoAndVideoDocument } from "../../../entities/photoAndVideo";
import { uploadFileToS3 } from "../../../helpers/uploadS3";
import { HttpStatusCode } from "../../../utils/enum";

@injectable()

export default class AdminPhotoAndvideoService implements IAdminPhotoAndvideoService {
    constructor(
        @inject("IPhotoAndVideoRepository") private _photoAndVideoRepository : IPhotoAndVideoRepository ,
      
    ) {}

async getPhotoAndVideoServices(page: number, limit: number): Promise<{ services: IPhotoAndVideoDocument[], total: number }> {
    try {
      const services = await this._photoAndVideoRepository.findAll(); // Assume repository supports pagination with skip and limit
      // const total = await this._photoAndVideoRepository.count();
      const total = services.length || 0
      return { services,total  };
    } catch (error) {
      throw new Error("Error retrieving photo and video services");
    }   
  };

  async createPhotoAndVideoServicesServc(serviceData: any): Promise<IPhotoAndVideoDocument> {
    try {
      let coverImageUrl: string | undefined;
      if (serviceData.coverImage) {
        const uploadResult = await uploadFileToS3(
          serviceData.coverImage.buffer,
          serviceData.coverImage.originalname,
          "eventgrid",
          serviceData.coverImage.mimetype
        );
        if (!uploadResult?.fileUrl) {
          throw {
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: "Failed to upload cover image",
            code: "COVER_UPLOAD_FAILED",
          };
        }
        coverImageUrl = uploadResult.fileUrl;
      }

      serviceData.coverImage = coverImageUrl;
      // delete serviceData.coverImage; // Remove file object before saving to DB
      console.log("service data for saving ....",serviceData);
      const created = await this._photoAndVideoRepository.create(serviceData);
      return created;
    } catch (error) {
      throw new Error("Error creating photo and video service");
    }
  }


}