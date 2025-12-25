import { inject, injectable } from "inversify";
import IAdminVenueService from "../../interfaces/admin/IAdminVenueService";
import { IServicesDocument } from "../../../entities/servicesEntity";
import { uploadFileToS3 } from "../../../helpers/uploadS3";
import { HttpStatusCode } from "../../../utils/enum";
import IServicesRepository from "../../../repositories/interfaces/IServicesRepository";
import IServicesService from "../../interfaces/user/IServicesService";

interface SearchParams {
  filters: any;
  sort: Record<string, 1 | -1>;
  page: number;
  limit: number;
}

@injectable()
export default class ServicesService implements IServicesService {
  constructor(
    @inject("IServicesRepository")
    private _servicesRepository: IServicesRepository
  ) {}

  async searchServices({ filters, sort, page, limit }: SearchParams) {
    const skip = (page - 1) * limit;


    console.log("serach filter is ",filters);
    console.log("sort is ",sort);
    console.log("page is ",page);
    console.log("limit is ",limit);

    const services = await this._servicesRepository.findAll(filters, {
      sort,
      skip,
      limit,
    });

    const total = await this._servicesRepository.countDocuments(filters);

    return { services, total };
  };

   async getById(id: string): Promise<IServicesDocument | null> {
      try {
        return await this._servicesRepository.findOne({_id:id});
      } catch (error) {
        throw new Error("Error retrieving venue service");
      }
  };

}
