import { Request,Response } from "express";

export default interface IAdminCateringController {
  getCateringServices(req: Request, res: Response): Promise<void>,
  createCateringServicesCtrl(req:Request, res: Response): Promise<void>,
  getCateringServiceById(req:Request, res: Response): Promise<void>,
  updateCateringService(req:Request, res: Response): Promise<void>,
}