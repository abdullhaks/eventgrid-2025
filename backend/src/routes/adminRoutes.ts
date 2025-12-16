import express from "express"
import { verifyAccessTokenMidleware } from "../middlewares.ts/checkAccessToken";
import container from "../config/inversify";


import IAdminAuthController from "../controllers/interfaces/admin/IAdminAuthController";
import IAdminPhotoAndvideoController from "../controllers/interfaces/admin/IAdminPhotoAndVideoController";

const adminRouter = express.Router();


const adminAuthCtrl = container.get<IAdminAuthController>("IAdminAuthController");
const photoAndVideoCtrl = container.get<IAdminPhotoAndvideoController>("IAdminPhotoAndvideoController");


adminRouter.post("/login",(req,res)=> adminAuthCtrl.login(req,res));
adminRouter.post('/logout',(req,res)=>adminAuthCtrl.logout(req,res));
adminRouter.post('/accessToken',(req,res)=>adminAuthCtrl.accessToken(req,res));

adminRouter.get('/photoAndVideoServices',(req,res)=>photoAndVideoCtrl.getPhotoAndVideoServices(req,res));







export default adminRouter