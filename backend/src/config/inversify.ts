import { Container } from "inversify";

//models

import User from "../models/user";
import Admin from "../models/admin";
import PhotoAndVidoe from "../models/photoAndVideo";

//controllers


import AuthController from "../controllers/implementations/user/authController";
import IAuthController from "../controllers/interfaces/user/IAuthController";
import ProfileController from "../controllers/implementations/user/profileController";
import IProfileController from "../controllers/interfaces/user/IProfileController";





import AdminAuthController from "../controllers/implementations/admin/adminAuthController";
import IAdminAuthController from "../controllers/interfaces/admin/IAdminAuthController";
import IAdminPhotoAndvideoController from "../controllers/interfaces/admin/IAdminPhotoAndVideoController";
import AdminPhotoAndVideoController from "../controllers/implementations/admin/photoAndVideoController";


//services

import AuthService from "../services/implementations/user/authService";
import IAuthService from "../services/interfaces/user/IAuthService";
import ProfileService from "../services/implementations/user/profileService";
import IProfileService from "../services/interfaces/user/IProfileService";  



import AdminAuthService from "../services/implementations/admin/adminAuthService";
import IAdminAuthService from "../services/interfaces/admin/IAdminAuthService";
import AdminPhotoAndvideoService from "../services/implementations/admin/adminPhotoAndvideoService";
import IAdminPhotoAndvideoService from "../services/interfaces/admin/IAdminPhotoAndvideoService";

//repositories

import IUserRepository from "../repositories/interfaces/IUserRepository";
import UserRepository from "../repositories/implementations/userRepository";

import IAdminRepository from "../repositories/interfaces/IAdminRepository";
import AdminRepository from "../repositories/implementations/adminRepository";

import IPhotoAndVideoRepository from "../repositories/interfaces/IPhotoAndVideoRepository";
import PhotoAndVideoRepository from "../repositories/implementations/photoAndVideoRepository";


//-------------------------------------------------------------------------------
const container = new Container();
//-------------------------------------------------------------------------------

//model binding


container.bind("userModel").toConstantValue(User);
container.bind('adminModel').toConstantValue(Admin);
container.bind('photoAndvidoeModle').toConstantValue(PhotoAndVidoe);


//repository binding

container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<IAdminRepository>("IAdminRepository").to(AdminRepository)
container.bind<IPhotoAndVideoRepository>("IPhotoAndVideoRepository").to(PhotoAndVideoRepository);

//service binding

container.bind<IAuthService>("IAuthService").to(AuthService);
container.bind<IProfileService>("IProfileService").to(ProfileService);
container.bind<IAdminAuthService>("IAdminAuthService").to(AdminAuthService);
container.bind<IAdminPhotoAndvideoService>("IAdminPhotoAndvideoService").to(AdminPhotoAndvideoService);


//controller binding
container.bind<IAuthController>("IAuthController").to(AuthController);
container.bind<IProfileController>("IProfileController").to(ProfileController);
container.bind<IAdminAuthController>("IAdminAuthController").to(AdminAuthController)
container.bind<IAdminPhotoAndvideoController>("IAdminPhotoAndvideoController").to(AdminPhotoAndVideoController);



export default container;
