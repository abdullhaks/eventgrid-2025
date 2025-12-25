import { Request,Response } from "express";

export default interface IPaymentController {
    createPaymentOrder(req:any, res:any): Promise<void>
    verifyOrderPayment(req:Request, res: Response): Promise<void>,
}