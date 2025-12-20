import { useState } from "react";
import { motion } from "framer-motion";
import { FormInput } from "../../components/FormInput";
import { verifyOtp } from "../../services/apis/userApi";
import { message } from "antd";
import { ArrowRight,Loader2,  } from "lucide-react";


export const Otp = ({ onNavigate }:any) => {
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem("eventgrid_email")

  const [formData, setFormData] = useState({
    otp: "",
    email:""
  });

  const [errors, setErrors] = useState({
    otp: "",
  });



  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "otp":
        if (!value) {
          newErrors.otp = "otp is required";
        }else {
          newErrors.otp = "";
        }
        break;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    const isOtpValid = validateField(
      "otp",
      formData.otp
    );
    const isValid = isOtpValid;

    if (!isValid) {
      message.error("Please enter valied otp");
      setIsLoading(false);
      return;
    }

    try {
      formData.email = email??''
      const response = await verifyOtp(formData);
      if(response){
       console.log("OTP verified successfully:", response.data);
      message.success("OTP verified successfully. Please log in.");

      setTimeout(() => {
         onNavigate('login')
      }, 2000);
   
      }
    
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Failed to log in";
      if (errorMessage.includes("Invalid credentials")) {
        // setErrors((prev) => ({
        //   ...prev,
        //   emailOrPhone: "Invalid email/phone ",
        //   password: "Invalid password",
        // }));
      } else if (errorMessage.includes("Please provide all required fields")) {
        setErrors((prev) => ({
          ...prev,
          otp: !formData.otp
            ? "Otp is required"
            : "",
        }));
      } 
        message.error(errorMessage);
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">

      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold font-display tracking-tight text-gray-900">Verify your email</h2>
        <p className="text-gray-500 mt-2">${email}</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput 
          label="Otp"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
          error={errors.otp}
          placeholder="_ _ _ _ _ _"
          icon={Lock}
        />
        
        <div className="flex justify-end">
          <button type="button" className="text-sm font-medium text-orange-600 hover:text-orange-700">
            Resent Password
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          type="submit"
          className="w-full bg-black text-white rounded-xl py-2 font-bold text-lg hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-orange-500/10"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Verify Otp"}
          {!isLoading && <ArrowRight size={18} />}
        </motion.button>
      </form>

      {/* <div className="mt-8 text-center">
        <p className="text-gray-500">
          Don't have an account?{' '}
          <button 
            onClick={() => onNavigate('signup')} 
            className="text-orange-600 font-bold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div> */}
    </div>
  );
};