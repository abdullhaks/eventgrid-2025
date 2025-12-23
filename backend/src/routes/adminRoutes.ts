import express from "express"
import { verifyAccessTokenMidleware } from "../middlewares.ts/checkAccessToken";
import container from "../config/inversify";
import { upload } from "../utils/S3Helpers";


import IAdminAuthController from "../controllers/interfaces/admin/IAdminAuthController";
import IAdminPhotoAndvideoController from "../controllers/interfaces/admin/IAdminPhotoAndVideoController";
import IAdminCateringController from "../controllers/interfaces/admin/IAdminCateringController"
import IAdminVenueController from "../controllers/interfaces/admin/IAdminVenueController";

const adminRouter = express.Router();


const adminAuthCtrl = container.get<IAdminAuthController>("IAdminAuthController");
const photoAndVideoCtrl = container.get<IAdminPhotoAndvideoController>("IAdminPhotoAndvideoController");
const cateringCtrl = container.get<IAdminCateringController>("IAdminCateringController");
const venueCtrl = container.get<IAdminVenueController>("IAdminVenueController");



adminRouter.post("/login",(req,res)=> adminAuthCtrl.login(req,res));
adminRouter.post('/logout',(req,res)=>adminAuthCtrl.logout(req,res));
adminRouter.post('/accessToken',(req,res)=>adminAuthCtrl.accessToken(req,res));

adminRouter.get('/photoAndVideoServices', (req, res) => photoAndVideoCtrl.getPhotoAndVideoServices(req, res));
adminRouter.post('/photoAndVideoServices', upload.single('coverImage'), (req, res) => photoAndVideoCtrl.createPhotoAndVideoServicesCtrl(req, res));
adminRouter.get('/photoAndVideoServices/:id', (req, res) => photoAndVideoCtrl.getPhotoAndVideoServiceById(req, res));
adminRouter.put('/photoAndVideoServices/:id', upload.single('coverImage'), (req, res) => photoAndVideoCtrl.updatePhotoAndVideoService(req, res));

adminRouter.get('/cateringServices', (req, res) => cateringCtrl.getCateringServices(req, res));
adminRouter.post('/cateringServices', upload.single('coverImage'), (req, res) => cateringCtrl.createCateringServicesCtrl(req, res));
adminRouter.get('/cateringServices/:id', (req, res) => cateringCtrl.getCateringServiceById(req, res));
adminRouter.put('/cateringServices/:id', upload.single('coverImage'), (req, res) => cateringCtrl.updateCateringService(req, res));


adminRouter.get('/venueServices', (req, res) => venueCtrl.getVenueServices(req, res));
adminRouter.post('/venueServices', upload.single('coverImage'), (req, res) => venueCtrl.createVenueServicesCtrl(req, res));
adminRouter.get('/venueServices/:id', (req, res) => venueCtrl.getVenueServiceById(req, res));
adminRouter.put('/venueServices/:id', upload.single('coverImage'), (req, res) => venueCtrl.updateVenueService(req, res));



export default adminRouter