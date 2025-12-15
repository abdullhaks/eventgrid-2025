import { Request, Response } from 'express';
import { HttpStatusCode } from '../../../utils/enum';
import { MESSAGES } from '../../../utils/messages';
import { inject, injectable } from 'inversify';
import IAdminAuthController from '../../interfaces/admin/IAdminAuthController'; 
import IAdminAuthService from '../../../services/interfaces/admin/IAdminAuthService'; 



@injectable()
export default class AdminAuthController implements IAdminAuthController {

constructor(
  @inject("IAdminAuthService") private _authService : IAdminAuthService
){}


  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Please provide all required fields",
          code: "MISSING_FIELDS",
        });
        return;
      }

      const result = await this._authService.loginUser({
        email,
        password,
      });

      res.cookie("eventgrid_refreshToken", result.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: parseInt(process.env.MAX_AGE || "604800000"),
        partitioned: true,
      
        
      });

      res.cookie("eventgrid_accessToken", result.accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: parseInt(process.env.MAX_AGE || "604800000"),
        partitioned: true,
      });

      res
        .status(HttpStatusCode.OK)
        .json({ message: result.message, user: result.user });
    } catch (error: any) {
      console.error("Error in login:", error);
      res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.message || MESSAGES.server.serverError,
        code: error.code || "SERVER_ERROR",
      });
    }
  }


async logout(req: Request, res: Response): Promise<void> {
    try {
      console.log("log out ............ ctrl....");
      res.clearCookie("eventgrid_refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.clearCookie("eventgrid_accessToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });


      res
        .status(HttpStatusCode.OK)
        .json({ message:"logout successfully"});
    } catch (error) {
      console.log(error);
    }

    
  };



 async accessToken(req: Request, res: Response): Promise<void>  {
    try {
      const { eventgrid_refreshToken } = req.cookies;

      if (!eventgrid_refreshToken) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ msg: "refresh token not found" });
        return;
      }

      const result = await this._authService.getAccessToken(eventgrid_refreshToken);

      console.log("result from ctrl is ...", result);

      if (!result) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ msg: "Refresh token expired" });
        return;
      }

      const { accessToken } = result;

      console.log("result from ctrl is afrt destructr...", accessToken);

      res.cookie("eventgrid_accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: parseInt(process.env.MAX_AGE || "604800000"),
      });

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: MESSAGES.server.serverError });
    }
  }





}