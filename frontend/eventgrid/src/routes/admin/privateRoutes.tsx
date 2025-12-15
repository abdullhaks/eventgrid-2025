import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store/store";

const UserPrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const {admin} = useSelector((state: RootState) => state.admin);

  if(admin){
    return <Outlet/>
  }else if(user){
    return <Navigate to='/user/home'/>
  }else{
    return <Navigate to="/" />;
  }

};

export default UserPrivateRoute;