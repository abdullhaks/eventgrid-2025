import express from "express"
import { verifyAccessTokenMidleware } from "../middlewares.ts/checkAccessToken";
import container from "../config/inversify";


import IAdminAuthController from "../controllers/interfaces/admin/IAdminAuthController";

const adminRouter = express.Router();


const adminAuthCtrl = container.get<IAdminAuthController>("IAdminAuthController");



adminRouter.post("/login",(req,res)=> adminAuthCtrl.login(req,res));
adminRouter.post('/logout',(req,res)=>adminAuthCtrl.logout(req,res));








export default adminRouter