import { Request, Response } from 'express';
import { HttpStatusCode } from '../../../utils/enum';
import { inject, injectable } from 'inversify';
import IAdminCateringController from '../../interfaces/admin/IAdminCateringController'; 
import IAdminCateringService from '../../../services/interfaces/admin/IAdminCateringService';


interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

type MulterFiles = {
  [fieldname: string]: MulterFile[];
};


@injectable()
export default class AdminCateringController implements IAdminCateringController {
    constructor(
        @inject("IAdminCateringService") private _adminCateringService: IAdminCateringService
    ) {}

  async getCateringServices(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const { services, total } = await this._adminCateringService.getCateringServices(page, limit);
      const totalPages = Math.ceil(total / limit);
      res.status(HttpStatusCode.OK).json({ services, totalPages });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving services', error });
    }
  };

  async createCateringServicesCtrl (req: Request , res:Response) : Promise <void> {
    try {
      const { serviceName, providerName, location, description, contact, price, bookingPrice, status, referLink } = req.body;

      // Backend validation
      if (!serviceName || serviceName.length < 3 || serviceName.length > 100) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid service name' });
      }
      if (!providerName || providerName.length < 2 || providerName.length > 100) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid provider name' });
      }
      let locObj;
      try {
        locObj = JSON.parse(location);
        if (locObj.type !== 'Point' || !Array.isArray(locObj.coordinates) || locObj.coordinates.length !== 2 || typeof locObj.text !== 'string' || locObj.text.length < 1) {
          throw new Error();
        }
      } catch {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid location format' });
      }
      if (!description || description.length < 10) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid description' });
      }
      const contactRegex = /^[\w.-]+@[\w.-]+\.\w+$|^\+?\d[\d\s-]{10,}$/;
      if (!contact || !contactRegex.test(contact)) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid contact' });
      }
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid price' });
      }
      const bookingPriceNum = parseFloat(bookingPrice);
      if (isNaN(bookingPriceNum) || bookingPriceNum <= 0) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid booking price' });
      }
      const statusNum = parseInt(status);
      if (![1, 2].includes(statusNum)) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid status' });
      }
      if (referLink && !/^https?:\/\/.+/i.test(referLink)) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid referLink' });
      }
      if (!req.file) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Cover image is required' });
      }

      // Prepare data for service
      const serviceData = {
        serviceName,
        providerName,
        location: locObj.text, // Save text as string, adjust if GeoJSON needed in DB
        description,
        contact,
        price: priceNum,
        bookingPrice: bookingPriceNum,
        status: statusNum,
        referLink: referLink || '',
        coverImage: req.file, // Pass the file object
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdService = await this._adminCateringService.createCateringServicesServc(serviceData);
      res.status(HttpStatusCode.CREATED).json(createdService);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error creating service', error });
    }
  };



  async getCateringServiceById(req: Request, res: Response): Promise<void> {
    try {
      const service = await this._adminCateringService.getById(req.params.id);
      if (!service) {
         res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Service not found' });
      }
      res.status(HttpStatusCode.OK).json(service);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving service', error });
    }
  };

  async updateCateringService(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const existing = await this._adminCateringService.getById(id);
      if (!existing) {
         res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Service not found' });
      }

      const { serviceName,providerName,location,description,contact,price,bookingPrice,status,referLink } = req.body;

      // Validation similar to create
      if (!serviceName || serviceName.length < 3 || serviceName.length > 100) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid service Name' });
      }
      if (!providerName || providerName.length < 2 || providerName.length > 100) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid provider Name' });
      }
      let locObj;
      try {
        locObj = JSON.parse(location);
        if (locObj.type !== 'Point' || !Array.isArray(locObj.coordinates) || locObj.coordinates.length !== 2 || typeof locObj.text !== 'string' || locObj.text.length < 1) {
          throw new Error();
        }
      } catch {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid location format' });
      }
      if (!description || description.length < 10) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid services description' });
      }
      const contactRegex = /^[\w.-]+@[\w.-]+\.\w+$|^\+?\d[\d\s-]{10,}$/;
      if (!contact || !contactRegex.test(contact)) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid contact' });
      }
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid price' });
      }

       const bookingPriceNum = parseFloat(bookingPrice);
      if (isNaN(bookingPriceNum) || bookingPriceNum <= 0) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid price' });
      }

      const statusNum = parseInt(status);
      if (![1, 2].includes(statusNum)) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid status' });
      }
      if (referLink && !/^https?:\/\/.+/i.test(referLink)) {
         res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid referLink' });
      }

      // Prepare data for service
      const serviceData = {
        serviceName,
        providerName,
        location: locObj.text,
        description,
        contact,
        price: priceNum,
        bookingPrice: bookingPriceNum,
        status: statusNum,
        referLink: referLink || '',
        coverImage: req.file ? req.file : null, // If no new file, null, service will keep old
        updatedAt: new Date(),
      };

      const updatedService = await this._adminCateringService.updateCateringService(id, serviceData);
      res.status(HttpStatusCode.OK).json(updatedService);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error updating service', error });
    }
  }

  
}