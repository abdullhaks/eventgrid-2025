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



export const updatePhotoAndVideoServiceStatus = async (serviceId: string, status: number) => {
  try {
    const response = await adminInstance.patch(`${ROUTES.admin.photoAndVideoServices}/${serviceId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating photo and video service status:", error);
    throw error;
  }
};
export const deletePhotoAndVideoService = async (serviceId: string) => {
  try {
    const response = await adminInstance.delete(`${ROUTES.admin.photoAndVideoServices}/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting photo and video service:", error);
    throw error;
  }
};

export const addPhotoAndVideoService = async (serviceData: any) => {
  try {
    const response = await adminInstance.post(ROUTES.admin.photoAndVideoServices, serviceData); 
    return response.data;
  } catch (error) {
    console.error("Error adding photo and video service:", error);
    throw error;
  }
};

export const getPhotoAndVideoService = async (page: number, limit: number) => {
  try {
    const response = await adminInstance.get(`${ROUTES.admin.photoAndVideoServices}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo and video services:", error);
    throw error;
  }
};