import { UserModel } from "@/src/modules/user/domain/models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = UserModel.Result;

const initialState = {
  id: '',
  name: '',
  email: '',
  avatar: null,
  accountId: '',
  createdAt: '',
} as unknown as User;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      for (const key in action.payload) {
        if (key in state) {
          (state as any)[key] = (action.payload as any)[key];
        }
      }
    },
    clearUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.avatar = '';
      state.accountId = '';
      state.createdAt = '';
    },
  }
})

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;