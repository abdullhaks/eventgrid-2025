import { Request,Response } from "express";

export default interface IServicesController {
    searchServices(req:any, res:any): Promise<void>
    getServiceById(req:Request, res: Response): Promise<void>,
}