import { AnimatePresence, motion } from "framer-motion";
import { GridBackground } from "../../components/gridBackground";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { login as welcome } from "../../redux/slices/userSlice";
import { loginAdmin as welcome } from "../../redux/slices/adminSlice";
import { message } from "antd";
import { Mail, EyeOff, Eye, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/FormInput";
import eg_logo from '/eg-logo3.png'
import { loginAdmin } from "../../services/apis/adminApi";





function AdminLogin() {

     const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (
          !emailRegex.test(value.trim()) 
        ) {
          newErrors.email =
            "Enter a valid email or 10-digit phone number";
        } else if (value.trim().length > 100) {
          newErrors.email = "Input must be less than 100 characters";
        } else {
          newErrors.email = "";
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (value.length > 128) {
          newErrors.password = "Password must be less than 128 characters";
        } else {
          newErrors.password = "";
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
    const isEmailValid = validateField(
      "emailOrPhone",
      formData.email
    );
    const isPasswordValid = validateField("password", formData.password);
    const isValid = isEmailValid && isPasswordValid;

    if (!isValid) {
      message.error("Please fix the form errors");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginAdmin(formData);
      dispatch(welcome({ admin: response.user }));
      message.success("Logged in successfully");
      navigate("/admin/dashboard");
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
          email: !formData.email
            ? "Email is required"
            : "",
          password: !formData.password ? "Password is required" : "",
        }));
      } 
        message.error(errorMessage);
    
    } finally {
      setIsLoading(false);
    }
  };


  // Swiss Design: Asymmetric Layout
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-200 overflow-hidden flex">
      {/* Inject Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* LEFT PANEL: Art & Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-5/12 bg-stone-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="z-10">
          <div className="flex items-center">
          <img src={eg_logo} className="h-28" alt="EVENTGRID" />
          {/* <span className="text-2xl font-bold tracking-tighter font-display">EVENTGRID</span> */}
          </div>
          <h1 className="text-6xl font-bold font-display tracking-tighter leading-none">
            Your Event.<br />
            <span className="text-orange-500">Our Grid.</span>
          </h1>
        </div>

        <div className="z-10 relative">
          <div className="space-y-6 max-w-sm">
             <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="font-serif italic text-xl mb-4">"The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style."</p>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-400 to-pink-500"></div>
                   <span className="text-sm font-bold opacity-80">Josef Müller-Brockmann</span>
                </div>
             </div>
          </div>
        </div>

        {/* Organic Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br from-orange-600/30 to-purple-900/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"
        />
        
        {/* Grid Texture */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
      </div>

      {/* RIGHT PANEL: Form Area */}
      <div className="w-full lg:w-7/12 relative flex flex-col">
        <GridBackground />
        
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10 overflow-y-auto">
          <AnimatePresence mode="wait">
        
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                   <div className="w-full max-w-md mx-auto">

      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold font-display tracking-tight text-gray-900">Welcome back Admin.</h2>
        <p className="text-gray-500 mt-2">Log in to manage EVENTgrid.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput 
          label="Email or Phone"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="john@example.com"
          icon={Mail}
        />
        
        <FormInput 
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          icon={Lock}
          endIcon={
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          }
        />

        <div className="flex justify-end">
          <button type="button" className="text-sm font-medium text-orange-600 hover:text-orange-700">
            Forgot Password?
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          type="submit"
          className="w-full bg-black text-white rounded-xl py-2 font-bold text-lg hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-orange-500/10"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Log In"}
          {!isLoading && <ArrowRight size={18} />}
        </motion.button>
      </form>

     
    </div>



                </motion.div>
            
          </AnimatePresence>
        </div>

        {/* Mobile-only Branding Footer */}
        <div className="lg:hidden p-6 text-center text-xs text-gray-400">
          EVENTGRID © 2024
        </div>
      </div>
    </div>
  );
}

export default AdminLogin