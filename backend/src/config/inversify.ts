import { Container } from "inversify";

//models

import User from "../models/user";
import Admin from "../models/admin";
import PhotoAndVidoe from "../models/photoAndVideo";
import Otp from "../models/otp";
import Catering from "../models/catering";
import Venue from "../models/venue";
//controllers


import AuthController from "../controllers/implementations/user/authController";
import IAuthController from "../controllers/interfaces/user/IAuthController";
import ProfileController from "../controllers/implementations/user/profileController";
import IProfileController from "../controllers/interfaces/user/IProfileController";






import AdminAuthController from "../controllers/implementations/admin/adminAuthController";
import IAdminAuthController from "../controllers/interfaces/admin/IAdminAuthController";
import IAdminPhotoAndvideoController from "../controllers/interfaces/admin/IAdminPhotoAndVideoController";
import AdminPhotoAndVideoController from "../controllers/implementations/admin/photoAndVideoController";
import AdminCateringController from "../controllers/implementations/admin/adminCateringController";
import IAdminCateringController from "../controllers/interfaces/admin/IAdminCateringController";
import AdminVenueController from "../controllers/implementations/admin/AdminVenueController";
import IAdminVenueController from "../controllers/interfaces/admin/IAdminVenueController";


//services

import AuthService from "../services/implementations/user/authService";
import IAuthService from "../services/interfaces/user/IAuthService";
import ProfileService from "../services/implementations/user/profileService";
import IProfileService from "../services/interfaces/user/IProfileService";  



import AdminAuthService from "../services/implementations/admin/adminAuthService";
import IAdminAuthService from "../services/interfaces/admin/IAdminAuthService";
import AdminPhotoAndvideoService from "../services/implementations/admin/adminPhotoAndvideoService";
import IAdminPhotoAndvideoService from "../services/interfaces/admin/IAdminPhotoAndvideoService";
import AdminCateringService from "../services/implementations/admin/adminCateringService";
import IAdminCateringService from "../services/interfaces/admin/IAdminCateringService";
import AdminVenueService from "../services/implementations/admin/adminVenueService";
import IAdminVenueService from "../services/interfaces/admin/IAdminVenueService";



//repositories

import IUserRepository from "../repositories/interfaces/IUserRepository";
import UserRepository from "../repositories/implementations/userRepository";

import IAdminRepository from "../repositories/interfaces/IAdminRepository";
import AdminRepository from "../repositories/implementations/adminRepository";

import IPhotoAndVideoRepository from "../repositories/interfaces/IPhotoAndVideoRepository";
import PhotoAndVideoRepository from "../repositories/implementations/photoAndVideoRepository";

import OtpRepository from "../repositories/implementations/otpRepository";
import IOtpRepository from "../repositories/interfaces/IOtpRepository";


import CateringRepository from "../repositories/implementations/cateringRepository";
import ICateringRepository from "../repositories/interfaces/ICateringRepository";


import VenueRepository from "../repositories/implementations/venueRepository"; 
import IVenueRepository from "../repositories/interfaces/IVenueRepository";


//-------------------------------------------------------------------------------
const container = new Container();
//-------------------------------------------------------------------------------

//model binding


container.bind("userModel").toConstantValue(User);
container.bind('adminModel').toConstantValue(Admin);
container.bind('photoAndvidoeModel').toConstantValue(PhotoAndVidoe);
container.bind('otpModel').toConstantValue(Otp);
container.bind('cateringModel').toConstantValue(Catering);
container.bind('venueModel').toConstantValue(Venue);


//repository binding

container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<IAdminRepository>("IAdminRepository").to(AdminRepository)
container.bind<IPhotoAndVideoRepository>("IPhotoAndVideoRepository").to(PhotoAndVideoRepository);
container.bind<IOtpRepository>('IOtpRepository').to(OtpRepository);
container.bind<ICateringRepository>('ICateringRepository').to(CateringRepository);
container.bind<IVenueRepository>('IVenueRepository').to(VenueRepository);



//service binding

container.bind<IAuthService>("IAuthService").to(AuthService);
container.bind<IProfileService>("IProfileService").to(ProfileService);

container.bind<IAdminAuthService>("IAdminAuthService").to(AdminAuthService);
container.bind<IAdminPhotoAndvideoService>("IAdminPhotoAndvideoService").to(AdminPhotoAndvideoService);
container.bind<IAdminCateringService>('IAdminCateringService').to(AdminCateringService);
container.bind<IAdminVenueService>('IAdminVenueService').to(AdminVenueService);





//controller binding
container.bind<IAuthController>("IAuthController").to(AuthController);
container.bind<IProfileController>("IProfileController").to(ProfileController);

container.bind<IAdminAuthController>("IAdminAuthController").to(AdminAuthController)
container.bind<IAdminPhotoAndvideoController>("IAdminPhotoAndvideoController").to(AdminPhotoAndVideoController);
container.bind<IAdminCateringController>('IAdminCateringController').to(AdminCateringController);
container.bind<IAdminVenueController>('IAdminVenueController').to(AdminVenueController);


export default container;
