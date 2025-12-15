import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../../pages/LandingPage";
import AdminPublicRoute from "./publicRoutes";

import AdminPrivateRoute from "./privateRoutes";
// import { Profile } from "../../pages/Profile";
import { SearchConsole } from "../../pages/user/SearchConsole";
import AdminLogin from "../../pages/admin/AdminLogin";
import Dashboard from "../../pages/admin/Dashboard";
import AdminDashboard from "../../pages/admin/Dashboard";
const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminPublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AdminLogin />} />
      </Route>
      <Route element={<AdminPrivateRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/search" element={<SearchConsole />} />
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