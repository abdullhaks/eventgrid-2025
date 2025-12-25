import { userInstance } from "../../utils/axiosFactory";
import { ROUTES } from "../../constants/routes";
import type { iSearchPrams } from "../../interfaces/user";

export const signupUser = async (userData: any) => {
  try {
    const response = await userInstance.post(ROUTES.user.signup, userData);
    return response.data;
  } catch (error: any) {
    console.error("Error signing up user:", error);
    throw {
      message: error.response?.data?.message || "Failed to sign up",
      code: error.response?.data?.code || "SERVER_ERROR",
    };
  }
};

export const verifyOtp = async (verfiData: any) => {
  try {
    const response = await userInstance.post(ROUTES.user.verifyOtp, verfiData);
    return response.data;
  } catch (error: any) {
    console.error("Error in verify user otp:", error);
    throw {
      message: error.response?.data?.message || "Failed to verify otp",
      code: error.response?.data?.code || "SERVER_ERROR",
    };
  }
};

export const loginUser = async (userData: any) => {
  try {
    const response = await userInstance.post(ROUTES.user.login, userData);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error logging in user:", error);
    throw error.response.data;
  }
};

export const accessToken = async () => {
  try {
    const response = await userInstance.get(ROUTES.user.accessToken);

    console.log("user api response is ", response);

    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await userInstance.post(ROUTES.user.logout);
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

export const searchServices = async (params: iSearchPrams) => {
  try {
    console.log("serch params is ", params);
    const response = await userInstance.get(ROUTES.user.search, {
      params,
    });
    console.log("response form frontend is", response);
    return response.data.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

export const getServiceById = async (id: string) => {
  try {
    const response = await userInstance.get(`${ROUTES.user.service}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo and video service by id:", error);
    throw error;
  }
};

export const createRazorpayOrder = async (data: { amount: number; serviceId: string; selectedDate: string,userId:string }) => {
  try {
    const response = await userInstance.post(ROUTES.user.createOrder, data);
    return response.data;
  } catch (error) {
    console.error("Error in create razorpay order:", error);
    throw error;
  }
};

export const verifyPayment = async (orderResponse: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  try {
    const response = await userInstance.post(ROUTES.user.verifyPayment, orderResponse);
    return response.data; // Expect { success: boolean, bookingId?: string, message?: string }
  } catch (error) {
    console.error("Error in verify payment:", error);
    throw error;
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    const response = await userInstance.put(
      ROUTES.user.updateProfile,
      profileData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in updating profile:", error);
    throw {
      message: error.response?.data?.message || "Failed to update profile",
      code: error.response?.data?.code || "SERVER_ERROR",
    };
  }
};

export const updateProfileImage = async (imageData: FormData) => {
  try {
    const response = await userInstance.put(
      ROUTES.user.updateProfileImage,
      imageData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in updating profile image:", error);
    throw {
      message:
        error.response?.data?.message || "Failed to update profile image",
      code: error.response?.data?.code || "SERVER_ERROR",
    };
  }
};
