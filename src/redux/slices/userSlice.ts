import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn } from 'api/services/authService';
import { TSignInParams, TdecodedToken } from 'core/types/server';
import { setLocalValue, removeLocalValue } from 'core/services/storageService';
import { LOCAL_STORAGE } from 'core/constants';
import jwt_decode from 'jwt-decode';

interface IUserSate {
  name: string;
  login: string;
  id: string;
}

const initialState: IUserSate = {
  name: '',
  login: '',
  id: '',
};

export const singIn = createAsyncThunk('user/signIn', async (user: TSignInParams) => {
  const { token } = await signIn(user);
  setLocalValue(LOCAL_STORAGE.TOKEN, token);
  const userData = jwt_decode<TdecodedToken>(token);
  return userData;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      state.name = '';
      state.login = '';
      state.id = '';
      removeLocalValue(LOCAL_STORAGE.TOKEN);
    },
  },
  extraReducers(builder) {
    builder.addCase(singIn.fulfilled, (state, action) => {
      const userData = action.payload;
      state.login = userData?.login || '';
      state.id = userData?.id || '';
    });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
