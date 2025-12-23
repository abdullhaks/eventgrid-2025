import { inject,injectable } from "inversify";
import IAdminCateringService from "../../interfaces/admin/IAdminCateringService";
import ICateringRepository from "../../../repositories/interfaces/ICateringRepository";
import { ICateringDocument } from "../../../entities/cateringEntity"; 
import { uploadFileToS3 } from "../../../helpers/uploadS3";
import { HttpStatusCode } from "../../../utils/enum";

@injectable()

export default class AdminCateringService implements IAdminCateringService {
    constructor(
        @inject("ICateringRepository") private _cateringRepository : ICateringRepository ,
      
    ) {}

async getCateringServices(page: number, limit: number): Promise<{ services: ICateringDocument[], total: number }> {
    try {

      const skip = (page - 1) * limit;

      const services = await this._cateringRepository.findAll({},{sort:{serviceName:1},limit:limit,skip:skip}); // Assume repository supports pagination with skip and limit
      const total = await this._cateringRepository.countDocument();
      return { services,total  };
    } catch (error) {
      throw new Error("Error retrieving catering services");
    }   
  };

  async createCateringServicesServc(serviceData: any): Promise<ICateringDocument> {
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
      const created = await this._cateringRepository.create(serviceData);
      return created;
    } catch (error) {
      throw new Error("Error creating catering service");
    }
  }


  async getById(id: string): Promise<ICateringDocument | null> {
      try {
        return await this._cateringRepository.findOne({_id:id});
      } catch (error) {
        throw new Error("Error retrieving catering service");
      }
  };

    async updateCateringService(id: string, serviceData: any): Promise<ICateringDocument | null> {
      try {
        const existing = await this._cateringRepository.findOne({_id:id});
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

        const updated = await this._cateringRepository.update({_id:id}, serviceData);
        return updated;
      } catch (error) {
        throw new Error("Error updating catering service");
      }
    }

}