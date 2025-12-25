import { inject, injectable } from "inversify";
import ISearchController from "../../interfaces/user/ISearchController";
import { HttpStatusCode } from "../../../utils/enum";
import { Request, Response } from "express";
import ISearchService from "../../../services/interfaces/user/ISearchService";

@injectable()
export default class SearchController implements ISearchController {
  constructor(
    @inject("ISearchService") private _searchService: ISearchService
  ) {}

  async searchServices(req: Request, res: Response): Promise<void> {
    try {
      const {
        search = "",
        category = "", // serviceType
        location = "",
        sort = "newest", // newest | price_asc | price_desc | name_asc
        page = "1",
        limit = "12",
      } = req.query;

      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 12;

      const filters: any = {};

      if (category && category !== "all") {
        filters.serviceType = category;
      }

      if (location) {
        filters.location = { $regex: location as string, $options: "i" };
      }

      const searchTerm = search as string;
      if (searchTerm.trim()) {
        const regex = new RegExp(searchTerm.trim(), "i");
        filters.$or = [
          { serviceName: regex },
          { providerName: regex },
          { location: regex },
          { description: regex },
        ];
      }

      let sortObj: Record<string, 1 | -1> = { createdAt: -1 }; // default newest

      switch (sort) {
        case "price_asc":
          sortObj = { price: 1 };
          break;
        case "price_desc":
          sortObj = { price: -1 };
          break;
        case "name_asc":
          sortObj = { serviceName: 1 };
          break;
        case "name_desc":
          sortObj = { serviceName: -1 };
          break;
        // default = newest (createdAt -1)
      }

      const { services, total } = await this._searchService.searchServices({
        filters,
        sort: sortObj,
        page: pageNum,
        limit: limitNum,
      });

      const totalPages = Math.ceil(total / limitNum);

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: {
          services,
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalItems: total,
            limit: limitNum,
            hasNext: pageNum < totalPages,
            hasPrev: pageNum > 1,
          },
        },
      });

    } catch (error: any) {
      console.error("Search services error:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error searching services",
        error: error.message,
      });
    }
  }
}
