import express from "express"
import { verifyAccessTokenMidleware } from "../middlewares.ts/checkAccessToken";
import container from "../config/inversify";


import IAdminAuthController from "../controllers/interfaces/admin/IAdminAuthController";

const adminRouter = express.Router();


const adminAuthCtrl = container.get<IAdminAuthController>("IAdminAuthController");



adminRouter.post("/login",(req,res)=> adminAuthCtrl.login(req,res));








export default adminRouter