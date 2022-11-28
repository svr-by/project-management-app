import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signIn } from 'api/services/authService';
import { getUserById, updateUserById, deleteUserById } from 'api/services/usersService';
import { TSignInParams, TdecodedToken, TUserPrams } from 'core/types/server';
import { getLocalValue, setLocalValue, removeLocalValue } from 'core/services/storageService';
import { LOCAL_STORAGE } from 'core/constants';
import jwt_decode from 'jwt-decode';

interface IUserSate {
  name: string;
  login: string;
  id: string;
  isLoading: boolean;
}

const initialState: IUserSate = {
  name: '',
  login: '',
  id: '',
  isLoading: false,
};

export const singIn = createAsyncThunk('user/signIn', async (user: TSignInParams) => {
  const { token } = await signIn(user);
  setLocalValue(LOCAL_STORAGE.TOKEN, token);
  const { id } = jwt_decode<TdecodedToken>(token);
  return getUserById(id);
});

export const checkToken = createAsyncThunk('user/checkToken', () => {
  const token = getLocalValue<string>(LOCAL_STORAGE.TOKEN);
  if (token) {
    const { id } = jwt_decode<TdecodedToken>(token);
    if (id) {
      return getUserById(id);
    }
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  ({ id, user }: { id: string; user: TUserPrams }) => {
    return updateUserById(id, user);
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', (id: string) => {
  return deleteUserById(id);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state) {
      state.name = '';
      state.login = '';
      state.id = '';
      removeLocalValue(LOCAL_STORAGE.TOKEN);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteUser.fulfilled, (state) => {
        state.name = '';
        state.login = '';
        state.id = '';
        removeLocalValue(LOCAL_STORAGE.TOKEN);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(singIn.fulfilled, checkToken.fulfilled, updateUser.fulfilled),
        (state, action) => {
          const userData = action.payload;
          state.name = userData?.name || '';
          state.login = userData?.login || '';
          state.id = userData?._id || '';
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(singIn.pending, checkToken.pending, updateUser.pending, deleteUser.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(singIn.rejected, checkToken.rejected, updateUser.rejected, deleteUser.pending),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
