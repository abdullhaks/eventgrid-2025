import { Request,Response } from "express";

export default interface IAdminPhotoAndvideoController {
  getPhotoAndVideoServices(req: Request, res: Response): Promise<void>,
  createPhotoAndVideoServicesCtrl(req:Request, res: Response): Promise<void>
}