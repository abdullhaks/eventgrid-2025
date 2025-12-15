import { Request,Response } from "express";

export default interface IAdminAuthController {
    login(req: Request, res: Response): Promise<void>
    logout(req: Request, res: Response): Promise<void>
    accessToken(req: Request, res: Response): Promise<void>
    
}