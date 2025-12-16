import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../../pages/LandingPage";
import AdminPublicRoute from "./publicRoutes";

import AdminPrivateRoute from "./privateRoutes";
// import { Profile } from "../../pages/Profile";
import AdminLogin from "../../pages/admin/AdminLogin";
import Layout from "../../pages/admin/Layout";
import { Music } from "lucide-react";
import Bookings from "../../pages/admin/Bookings";
import Catering from "../../pages/admin/Catering";
import Overview from "../../pages/admin/Overview";
import Payments from "../../pages/admin/Payments";
import Photography from "../../pages/admin/Photography";
import Weddings from "../../pages/admin/Weddings";
import CancelledBookings from "../../pages/admin/CancelledBookings";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminPublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AdminLogin />} />
      </Route>

      <Route element={<AdminPrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/music" element={<Music />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/returns" element={<CancelledBookings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AdminRoutes;
