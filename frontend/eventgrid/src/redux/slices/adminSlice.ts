import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAdmin } from '../../interfaces/admin';

interface AuthState {
  admin: IAdmin | null;
}

const initialState: AuthState = {
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action: PayloadAction<{ admin: IAdmin }>) => {
      state.admin = action.payload.admin;
    },
    logoutAdmin: (state) => {
      state.admin = null;
    },
    updateAdmin: (state, action: PayloadAction<Partial<IAdmin>>) => {
      if (state.admin) {
        state.admin = { ...state.admin, ...action.payload };
      }
    }
  }
});

export const { loginAdmin, logoutAdmin, updateAdmin } = adminSlice.actions;

export default adminSlice.reducer;
