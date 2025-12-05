import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { FormInput } from "../components/FormInput";
// import thinkletLogo from "../assets/thinklet.png";
import { loginUser } from "../services/apis/userApi";
import { useDispatch } from "react-redux";
import { loginUser as welcome } from "../redux/slices/userSlice";
import { message } from "antd";
import { ArrowRight, Eye, EyeOff, Loader2, Mail } from "lucide-react";

export const Login = ({ onNavigate }:any) => {
const navigate = useNavigate();
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    emailOrPhone: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'emailOrPhone':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) {
          newErrors.emailOrPhone = 'Email or phone number is required';
        } else if (!emailRegex.test(value.trim()) && !phoneRegex.test(value.trim())) {
          newErrors.emailOrPhone = 'Enter a valid email or 10-digit phone number';
        } else if (value.trim().length > 100) {
          newErrors.emailOrPhone = 'Input must be less than 100 characters';
        } else {
          newErrors.emailOrPhone = '';
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
        break;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

const handleSubmit = async () => {
  setIsLoading(true);
  const isEmailOrPhoneValid = validateField('emailOrPhone', formData.emailOrPhone);
  const isPasswordValid = validateField('password', formData.password);
  const isValid = isEmailOrPhoneValid && isPasswordValid;

  if (!isValid) {
    message.error('Please fix the form errors');
    setIsLoading(false);
    return;
  }

  try {
    const response = await loginUser(formData);
    dispatch(welcome({ user: response.user }));
    message.success('Logged in successfully');
    navigate('/user/home');
  } catch (error: any) {
    console.error('Login error:', error);
    const errorMessage = error.message || 'Failed to log in';
    if (errorMessage.includes('Invalid credentials')) {
      setErrors(prev => ({
        ...prev,
        emailOrPhone: 'Invalid email/phone or password',
        password: 'Invalid email/phone or password',
      }));
    } else if (errorMessage.includes('Please provide all required fields')) {
      setErrors(prev => ({
        ...prev,
        emailOrPhone: !formData.emailOrPhone ? 'Email or phone is required' : '',
        password: !formData.password ? 'Password is required' : '',
      }));
    } else {
      message.error(errorMessage);
    }
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
        <h2 className="text-3xl font-bold font-display tracking-tight text-gray-900">Welcome back.</h2>
        <p className="text-gray-500 mt-2">Log in to manage your EVENT grid.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput 
          label="Email or Phone"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          error={errors.emailOrPhone}
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

      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Don't have an account?{' '}
          <button 
            onClick={() => onNavigate('signup')} 
            className="text-orange-600 font-bold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};