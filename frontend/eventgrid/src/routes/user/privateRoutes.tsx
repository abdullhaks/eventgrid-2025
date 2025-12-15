import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store/store";

const UserPrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const {admin} = useSelector((state: RootState) => state.admin);

  if(user){
    console.log('yes user is there');
    return <Outlet/>
  }else if(admin){
    return <Navigate to='/admin/dashboard'/>
  }else{
    return <Navigate to="/" />;
  }

};

export default UserPrivateRoute;