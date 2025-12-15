import { adminLoginRequestDto } from "../../../dto/adminDto";




export default interface IAdminAuthService {
loginUser(userData: adminLoginRequestDto): Promise<any>
getAccessToken(refreshToken: string): Promise<any>



}