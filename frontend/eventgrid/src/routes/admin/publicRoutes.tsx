import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store/store";

const AdminPublicRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const {admin} = useSelector((state: RootState) => state.admin);

  if(user){
    return <Navigate to= "/user/home"/>
  }else if(admin){
    return <Navigate to="/admin/dashboard"/>
  }else{
    return <Outlet />;
  }

};

export default AdminPublicRoute;
