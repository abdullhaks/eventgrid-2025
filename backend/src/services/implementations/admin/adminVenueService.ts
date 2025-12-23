import { inject,injectable } from "inversify";
import IAdminVenueService from "../../interfaces/admin/IAdminVenueService"; 
import IVenueRepository from "../../../repositories/interfaces/IVenueRepository"; 
import { IVenueDocument } from "../../../entities/venueEntity"; 
import { uploadFileToS3 } from "../../../helpers/uploadS3";
import { HttpStatusCode } from "../../../utils/enum";

@injectable()
export default class AdminVenueService implements IAdminVenueService {
    constructor(
        @inject("IVenueRepository") private _venueRepository : IVenueRepository ,
      
    ) {}

async getVenueServices(page: number, limit: number): Promise<{ services: IVenueDocument[], total: number }> {
    try {

      const skip = (page - 1) * limit;

      const services = await this._venueRepository.findAll({},{sort:{serviceName:1},limit:limit,skip:skip}); // Assume repository supports pagination with skip and limit
      const total = await this._venueRepository.countDocument();
      return { services,total  };
    } catch (error) {
      throw new Error("Error retrieving venue services");
    }   
  };

  async createVenueServicesServc(serviceData: any): Promise<IVenueDocument> {
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
      const created = await this._venueRepository.create(serviceData);
      return created;
    } catch (error) {
      throw new Error("Error creating venue service");
    }
  }


  async getById(id: string): Promise<IVenueDocument | null> {
      try {
        return await this._venueRepository.findOne({_id:id});
      } catch (error) {
        throw new Error("Error retrieving venue service");
      }
  };

    async updateVenueService(id: string, serviceData: any): Promise<IVenueDocument | null> {
      try {
        const existing = await this._venueRepository.findOne({_id:id});
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

        const updated = await this._venueRepository.update({_id:id}, serviceData);
        return updated;
      } catch (error) {
        throw new Error("Error updating venue service");
      }
    }

}