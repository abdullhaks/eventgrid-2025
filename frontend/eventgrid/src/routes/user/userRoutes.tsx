import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../../pages/LandingPage";
import { Login } from "../../pages/user/Login";
import { Signup } from "../../pages/user/Signup";
import { Home } from "../../pages/user/Home";
import UserPublicRoute from "../../routes/user/publicRoutes";
import UserPrivateRoute from "../../routes/user/privateRoutes";
// import { Profile } from "../../pages/Profile";

import Auth from "../../pages/user/Auth";
import { SearchConsole } from "../../pages/user/SearchConsole";
import { Otp } from "../../pages/user/Otp"; 
import { ServiceDetails } from "../../pages/user/ServiceDetails";
import { BookingFailed } from "../../components/BookingFailed";
import { BookingSuccess } from "../../components/BookingSuccess";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserPublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp/>} />
      </Route>
      <Route element={<UserPrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchConsole />} />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route path="/booking-failed" element={<BookingFailed />} />
        <Route path="/booking-success/:bookingId" element={<BookingSuccess />} />


        
        {/* <Route path="/settings" element={<Profile />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/edit/:articleId" element={<CreateArticle editMode={true} />} /> */}
        
      </Route>
      {/* <Route path="/article/:articleId" element={<ArticleView />} /> */}

      <Route path="*" element={<Navigate to="/" />} />
      

    </Routes>
  );
};

export default UserRoutes;