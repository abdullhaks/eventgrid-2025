import { Request, Response } from 'express';
import { HttpStatusCode } from '../../../utils/enum';
import { inject, injectable } from 'inversify';
import IAdminPhotoAndvideoController from '../../interfaces/admin/IAdminPhotoAndVideoController';
import IAdminPhotoAndvideoService from '../../../services/interfaces/admin/IAdminPhotoAndvideoService';

@injectable()
export default class AdminPhotoAndVideoController implements IAdminPhotoAndvideoController {
    constructor(
        @inject("IAdminPhotoAndvideoService") private _adminPhotoAndvideoService: IAdminPhotoAndvideoService
    ) {}
     async getPhotoAndVideoServices(req: Request, res: Response): Promise<void> {
        try {
            const services = await this._adminPhotoAndvideoService.getPhotoAndVideoServices();
            res.status(HttpStatusCode.OK).json({ services });
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving services', error });
        }
    }
}