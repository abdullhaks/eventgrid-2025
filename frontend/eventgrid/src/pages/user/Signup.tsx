import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { message } from "antd";
import { FormInput } from "../../components/FormInput";
import { signupUser } from "../../services/apis/userApi";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../redux/slices/userSlice";
import { ChevronLeft, User, Mail, Phone, EyeOff, Eye, Loader2 } from "lucide-react";

export const Signup = ({ onNavigate }:any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });



  const validateField = (name:string, value:string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'First name is required';
        } else if (value.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          newErrors.firstName = 'First name must be less than 50 characters';
        } else {
          newErrors.firstName = '';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Last name is required';
        } else if (value.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          newErrors.lastName = 'Last name must be less than 50 characters';
        } else {
          newErrors.lastName = '';
        }
        break;
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(value.trim())) {
          newErrors.phone = 'Enter a valid 10-digit phone number';
        } else {
          newErrors.phone = '';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value.trim())) {
          newErrors.email = 'Enter a valid email';
        } else if (value.trim().length > 100) {
          newErrors.email = 'Email must be less than 100 characters';
        } else {
          newErrors.email = '';
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (value.length > 128) {
          newErrors.password = 'Password must be less than 128 characters';
        } else {
          newErrors.password = '';
        }
        // Check match if confirm password exists
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else if (formData.confirmPassword) {
          newErrors.confirmPassword = '';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirm password is required';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          newErrors.confirmPassword = '';
        }
        break;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isValid = validateField('firstName', formData.firstName) &&
                      validateField('lastName', formData.lastName) &&
                      validateField('phone', formData.phone) &&
                      validateField('email', formData.email) &&
                      validateField('password', formData.password) &&
                      validateField('confirmPassword', formData.confirmPassword);

      if (!isValid) {
        message.error("Please fix the form errors");
        setIsLoading(false);
        return;
      }

      const response = await signupUser(formData);
      if (response) {
        // dispatch(logoutUser());
        // dispatch(loginUser({ user: response }));

        console.log('sighup repsonse is ',response)
        localStorage.setItem("eventgrid_email",response.email);
        message.success("Signed up successfully, please verify your email");
        // navigate("/user/otp");
        onNavigate('otp')
        // setTimeout(() => message.success("Welcome to Eventgrid"), 500);
      }
    } catch (error:any) {
      console.error("Signup error:", error);
      const errorCode = error.code || "SERVER_ERROR";
      switch (errorCode) {
        case "USER_EXISTS":
          setErrors(prev => ({ ...prev, email: "This email is already registered" }));
          message.error("Email already exists");
          break;
        case "PASSWORD_MISMATCH":
          setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
          break;
        case "MISSING_FIELDS":
          message.error("Please provide all required fields");
          break;
        default:
          message.error(error.message || "Failed to sign up");
      }
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button 
          onClick={() => navigate('login')}
          className="flex items-center text-gray-400 hover:text-black mb-4 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Start
        </button>
        <h2 className="text-3xl font-bold font-display tracking-tight text-gray-900">Join the Grid.</h2>
        <p className="text-gray-500 mt-2">Create an account to start your journey.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput 
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="Jane"
            icon={User}
          />
          <FormInput 
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Doe"
          />
        </div>

        <FormInput 
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="jane@eventgrid.com"
          icon={Mail}
        />

        <FormInput 
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="1234567890"
          icon={Phone}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <FormInput 
            label="Confirm"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
            icon={Lock}
            endIcon={
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            }
          />
        </div>

        <div className="pt-2">
           <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-black text-white rounded-xl py-2 font-bold text-lg hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-orange-500/10"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
          </motion.button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Already on the grid?{' '}
          <button 
            onClick={() => onNavigate('login')} 
            className="text-orange-600 font-bold hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};