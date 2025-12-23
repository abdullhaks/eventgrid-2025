import { Request,Response } from "express";

export default interface IAdminVenueController {
  getVenueServices(req: Request, res: Response): Promise<void>,
  createVenueServicesCtrl(req:Request, res: Response): Promise<void>,
  getVenueServiceById(req:Request, res: Response): Promise<void>,
  updateVenueService(req:Request, res: Response): Promise<void>,
}