import { adminInstance } from "../../utils/axiosFactory";
import { ROUTES } from "../../constants/routes";



export const loginAdmin = async (adminData: any) => {
  try {
    const response = await adminInstance.post(ROUTES.admin.login, adminData);
    console.log("Admin login response:", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Error logging in admin:", error);
    throw error.response.data;
  }
};

export const logoutAdmin = async () => {
  try {
    const response = await adminInstance.post(ROUTES.admin.logout);
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};