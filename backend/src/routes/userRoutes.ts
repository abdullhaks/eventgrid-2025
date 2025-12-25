import express from "express"
import { upload } from "../helpers/uploadS3";
import { verifyAccessTokenMidleware } from "../middlewares.ts/checkAccessToken";
import container from "../config/inversify"
import IAuthController from "../controllers/interfaces/user/IAuthController";
import IProfileController from "../controllers/interfaces/user/IProfileController";
import IServicesController from "../controllers/interfaces/user/IServicesController";
import IPaymentController from "../controllers/interfaces/user/IPaymentController";

const userRouter = express.Router();

const authController = container.get<IAuthController>("IAuthController");
const profileController = container.get<IProfileController>("IProfileController");
const servicesController = container.get<IServicesController>("IServicesController");
const paymentController = container.get<IPaymentController>("IPaymentController");


userRouter.post('/signup',(req,res)=>authController.signup(req,res));
userRouter.post('/verifyOtp',(req,res)=> authController.verifyOtp(req,res));
userRouter.post("/login", (req, res) => authController.login(req, res));
userRouter.get('/accessToken',(req,res)=>authController.accessToken(req,res));
userRouter.post('/logout',(req,res)=>authController.logout(req,res));



userRouter.put('/updateProfileImage',verifyAccessTokenMidleware("user"),upload.fields([
    { name: "profile", maxCount: 1 },
  ]),(req,res)=>profileController.updateProfileImageController(req,res)); 
userRouter.put('/updateProfile',verifyAccessTokenMidleware("user"), (req,res)=>profileController.updateProfileController(req,res));

userRouter.get("/search",(req,res)=>servicesController.searchServices(req,res));

userRouter.get("/service/:id",(req,res)=>servicesController.getServiceById(req,res));

userRouter.post("/createOrder",(req,res)=>paymentController.createPaymentOrder(req,res));
userRouter.post("/verifyPayment",(req,res)=>paymentController.verifyOrderPayment(req,res));


export default userRouter

