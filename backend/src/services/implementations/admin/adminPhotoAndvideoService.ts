import { inject,injectable } from "inversify";
import IAdminPhotoAndvideoService from "../../interfaces/admin/IAdminPhotoAndvideoService";
import IServicesRepository from "../../../repositories/interfaces/IServicesRepository";
import { IServicesDocument } from "../../../entities/servicesEntity"; 
import { uploadFileToS3 } from "../../../helpers/uploadS3";
import { HttpStatusCode } from "../../../utils/enum";

@injectable()

export default class AdminPhotoAndvideoService implements IAdminPhotoAndvideoService {
    constructor(
        @inject("IServicesRepository") private _servicesRepository : IServicesRepository ,
      
    ) {}

async getPhotoAndVideoServices(page: number, limit: number): Promise<{ services: IServicesDocument[], total: number }> {
    try {

      const skip = (page - 1) * limit;

      const services = await this._servicesRepository.findAll({serviceType:"photoAndVideo"},{sort:{serviceName:1},limit:limit,skip:skip}); // Assume repository supports pagination with skip and limit
      const total = await this._servicesRepository.countDocument({serviceType:"photoAndVideo"});
      return { services,total  };
    } catch (error) {
      throw new Error("Error retrieving photo and video services");
    }   
  };

  async createPhotoAndVideoServicesServc(serviceData: any): Promise<IServicesDocument> {
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
      serviceData.serviceType = 'photoAndVideo';
      // delete serviceData.coverImage; // Remove file object before saving to DB
      console.log("service data for saving ....",serviceData);
      const created = await this._servicesRepository.create(serviceData);
      return created;
    } catch (error) {
      throw new Error("Error creating photo and video service");
    }
  }


  async getById(id: string): Promise<IServicesDocument | null> {
      try {
        return await this._servicesRepository.findOne({_id:id});
      } catch (error) {
        throw new Error("Error retrieving photo and video service");
      }
  };

    async updatePhotoAndVideoService(id: string, serviceData: any): Promise<IServicesDocument | null> {
      try {
        const existing = await this._servicesRepository.findOne({_id:id});
        if (!existing) return null;

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
          serviceData.coverImage = uploadResult.fileUrl;
        } else {
          serviceData.coverImage = existing.coverImage;
        }

        const updated = await this._servicesRepository.update({_id:id}, serviceData);
        return updated;
      } catch (error) {
        throw new Error("Error updating photo and video service");
      }
    }

}