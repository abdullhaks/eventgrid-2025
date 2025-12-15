import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../../pages/LandingPage";
import { Home } from "../../pages/user/Home";
import UserPublicRoute from "../user/publicRoutes";
import UserPrivateRoute from "../user/privateRoutes";
// import { Profile } from "../../pages/Profile";
import { SearchConsole } from "../../pages/user/SearchConsole";
import AdminLogin from "../../pages/admin/AdminLogin";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserPublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AdminLogin />} />
      </Route>
      <Route element={<UserPrivateRoute />}>
        <Route path="/home" element={<Home />} />
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