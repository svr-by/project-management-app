import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signUp, signIn } from 'api/services/authService';
import { getUserById } from 'api/services/usersService';
import { TUserPrams, TSignInParams, TdecodedToken } from 'core/types/server';
import { getLocalValue, setLocalValue, removeLocalValue } from 'core/services/storageService';
import { LOCAL_STORAGE } from 'core/constants';
import jwt_decode from 'jwt-decode';

interface IUserSate {
  login: string;
  id: string;
}

const initialState: IUserSate = {
  login: '',
  id: '',
};

export const singUp = createAsyncThunk('user/signUp', async (user: TUserPrams) => {
  return signUp(user);
});

export const singIn = createAsyncThunk('user/signIn', async (user: TSignInParams) => {
  const { token } = await signIn(user);
  setLocalValue(LOCAL_STORAGE.TOKEN, token);
  const userData = jwt_decode<TdecodedToken>(token);
  return userData;
});

export const checkToken = createAsyncThunk('user/checkToken', async () => {
  const token = getLocalValue<string>(LOCAL_STORAGE.TOKEN);
  if (token) {
    const userData = jwt_decode<TdecodedToken>(token);
    if (userData) {
      return getUserById(userData.id);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state) {
      state.login = '';
      state.id = '';
      removeLocalValue(LOCAL_STORAGE.TOKEN);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(singIn.fulfilled, (state, action) => {
        const userData = action.payload;
        state.login = userData?.login || '';
        state.id = userData?.id || '';
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        const userData = action.payload;
        state.login = userData?.login || '';
        state.id = userData?._id || '';
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
