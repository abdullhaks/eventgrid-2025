import { type Action, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"
import adminReducer from '../slices/adminSlice'
import { type IUser } from "../../interfaces/user";
import type { IAdmin } from "../../interfaces/admin";


interface RootState {
  user: { user: IUser | null };
  admin: {admin:IAdmin | null };

}


const appReducer = combineReducers({

    user:userReducer,
    admin:adminReducer


});

const rootReducer = (state: RootState | undefined, action: Action): RootState =>{
    if (action.type ===   "LOGOUT"){
        state = undefined;
    };

    return appReducer(state, action);
};

export default rootReducer; 