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


//apis for photo and video services................
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

export const getPhotoAndVideoServiceById = async (id: string) => {
  try {
    const response = await adminInstance.get(`${ROUTES.admin.photoAndVideoServices}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo and video service by id:", error);
    throw error;
  }
};

export const updatePhotoAndVideoService = async (id: string, serviceData: any) => {
  try {
    const response = await adminInstance.put(`${ROUTES.admin.photoAndVideoServices}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error updating photo and video service:", error);
    throw error;
  }
};


//apis for catering services................
export const addCateringService = async (serviceData: any) => {
  try {
    const response = await adminInstance.post(ROUTES.admin.cateringServices, serviceData); 
    return response.data;
  } catch (error) {
    console.error("Error adding photo and video service:", error);
    throw error;
  }
};

export const getCateringService = async (page: number, limit: number) => {
  try {
    const response = await adminInstance.get(`${ROUTES.admin.cateringServices}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo and video services:", error);
    throw error;
  }
};

export const getCateringServiceById = async (id: string) => {
  try {
    const response = await adminInstance.get(`${ROUTES.admin.cateringServices}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo and video service by id:", error);
    throw error;
  }
};

export const updateCateringService = async (id: string, serviceData: any) => {
  try {
    const response = await adminInstance.put(`${ROUTES.admin.cateringServices}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error updating photo and video service:", error);
    throw error;
  }
};



export const addVenueService = async (serviceData: any) => {
  try {
    const response = await adminInstance.post(ROUTES.admin.venueServices, serviceData); 
    return response.data;
  } catch (error) {
    console.error("Error adding photo and video service:", error);
    throw error;
  }
};

export const getVenueService = async (page: number, limit: number) => {
  try {
    const response = await adminInstance.get(`${ROUTES.admin.venueServices}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo and video services:", error);
    throw error;
  }
};

export const getVenueServiceById = async (id: string) => {
  try {
    const response = await adminInstance.get(`${ROUTES.admin.venueServices}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo and video service by id:", error);
    throw error;
  }
};

export const updateVenueService = async (id: string, serviceData: any) => {
  try {
    const response = await adminInstance.put(`${ROUTES.admin.venueServices}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error updating photo and video service:", error);
    throw error;
  }
};