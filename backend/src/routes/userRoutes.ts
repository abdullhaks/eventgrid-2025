import express from "express"
import { upload } from "../helpers/uploadS3";
import { verifyAccessTokenMidleware } from "../middlewares.ts/checkAccessToken";
import container from "../config/inversify"
import IAuthController from "../controllers/interfaces/user/IAuthController";
import IProfileController from "../controllers/interfaces/user/IProfileController";
import ISearchController from "../controllers/interfaces/user/ISearchController";

const userRouter = express.Router();

const authController = container.get<IAuthController>("IAuthController");
const profileController = container.get<IProfileController>("IProfileController");
const searchController = container.get<ISearchController>("ISearchController");


userRouter.post('/signup',(req,res)=>authController.signup(req,res));
userRouter.post('/verifyOtp',(req,res)=> authController.verifyOtp(req,res));
userRouter.post("/login", (req, res) => authController.login(req, res));
userRouter.get('/accessToken',(req,res)=>authController.accessToken(req,res));
userRouter.post('/logout',(req,res)=>authController.logout(req,res));



userRouter.put('/updateProfileImage',verifyAccessTokenMidleware("user"),upload.fields([
    { name: "profile", maxCount: 1 },
  ]),(req,res)=>profileController.updateProfileImageController(req,res)); 
userRouter.put('/updateProfile',verifyAccessTokenMidleware("user"), (req,res)=>profileController.updateProfileController(req,res));

userRouter.get("/search",(req,res)=>searchController.searchServices(req,res));





export default userRouter

