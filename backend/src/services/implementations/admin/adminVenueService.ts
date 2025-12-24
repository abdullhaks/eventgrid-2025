import { inject,injectable } from "inversify";
import IAdminVenueService from "../../interfaces/admin/IAdminVenueService"; 
import { IServicesDocument } from "../../../entities/servicesEntity"; 
import { uploadFileToS3 } from "../../../helpers/uploadS3";
import { HttpStatusCode } from "../../../utils/enum";
import IServicesRepository from "../../../repositories/interfaces/IServicesRepository";

@injectable()
export default class AdminVenueService implements IAdminVenueService {
    constructor(
        @inject("IServicesRepository") private _servicesRepository : IServicesRepository ,
        
      
    ) {}

async getVenueServices(page: number, limit: number): Promise<{ services: IServicesDocument[], total: number }> {
    try {

      const skip = (page - 1) * limit;

      const services = await this._servicesRepository.findAll({serviceType:"venue"},{sort:{serviceName:1},limit:limit,skip:skip}); // Assume repository supports pagination with skip and limit
      const total = await this._servicesRepository.countDocument({serviceType:"venue"});
      return { services,total  };
    } catch (error) {
      throw new Error("Error retrieving venue services");
    }   
  };

  async createVenueServicesServc(serviceData: any): Promise<IServicesDocument> {
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
      serviceData.serviceType = 'venue';

      // delete serviceData.coverImage; // Remove file object before saving to DB
      console.log("service data for saving ....",serviceData);
      const created = await this._servicesRepository.create(serviceData);
      return created;
    } catch (error) {
      throw new Error("Error creating venue service");
    }
  }


  async getById(id: string): Promise<IServicesDocument | null> {
      try {
        return await this._servicesRepository.findOne({_id:id});
      } catch (error) {
        throw new Error("Error retrieving venue service");
      }
  };

    async updateVenueService(id: string, serviceData: any): Promise<IServicesDocument | null> {
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
        throw new Error("Error updating venue service");
      }
    }

}