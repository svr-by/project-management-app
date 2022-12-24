import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signUserUp, signUserIn } from 'api/services/authService';
import { getUserById, updateUserById, deleteUserById } from 'api/services/usersService';
import {
  TSignInParams,
  TdecodedToken,
  TUserPrams,
  TServerMessage,
  TUserRes,
} from 'core/types/server';
import { getLocalValue, setLocalValue, removeLocalValue } from 'core/services/storageService';
import { handlerError } from 'core/services/errorHandlerService';
import { LOCAL_STORAGE } from 'core/constants';
import jwt_decode from 'jwt-decode';

interface IUserSate {
  name: string;
  login: string;
  id: string;
  isLoading: boolean;
  message: TServerMessage | null;
}

const initialState: IUserSate = {
  name: '',
  login: '',
  id: '',
  isLoading: false,
  message: null,
};

export const signUp = createAsyncThunk<TUserRes, TUserPrams, { rejectValue: TServerMessage }>(
  'user/signUp',
  async (user: TUserPrams, { rejectWithValue }) => {
    try {
      return await signUserUp(user);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

export const singIn = createAsyncThunk<
  TUserRes | undefined,
  TSignInParams,
  { rejectValue: TServerMessage }
>('user/signIn', async (user, { rejectWithValue }) => {
  try {
    const data = await signUserIn(user);
    if (data) {
      setLocalValue(LOCAL_STORAGE.TOKEN, data.token);
      const { id } = jwt_decode<TdecodedToken>(data.token);
      return getUserById(id);
    }
  } catch (err) {
    return rejectWithValue(handlerError(err));
  }
});

export const checkToken = createAsyncThunk<
  TUserRes | undefined,
  void,
  { rejectValue: TServerMessage }
>('user/checkToken', async (_, { rejectWithValue }) => {
  try {
    const token = getLocalValue<string>(LOCAL_STORAGE.TOKEN);
    if (token) {
      const { id } = jwt_decode<TdecodedToken>(token);
      if (id) {
        return await getUserById(id);
      }
    }
  } catch (err) {
    return rejectWithValue(handlerError(err));
  }
});

export const updateUser = createAsyncThunk<
  { user: TUserRes; message: TServerMessage },
  { id: string; user: TUserPrams },
  { rejectValue: TServerMessage }
>('user/updateUser', async ({ id, user }, { rejectWithValue }) => {
  try {
    const data = await updateUserById(id, user);
    const succesMes: TServerMessage = {
      message: 'User profile updated',
      severity: 'success',
    };
    return { user: data, message: succesMes };
  } catch (err) {
    return rejectWithValue(handlerError(err));
  }
});

export const deleteUser = createAsyncThunk<TUserRes, string, { rejectValue: TServerMessage }>(
  'user/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteUserById(id);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state) {
      state.name = '';
      state.login = '';
      state.id = '';
      state.message = null;
      removeLocalValue(LOCAL_STORAGE.TOKEN);
    },
    eraseErr(state) {
      state.message = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteUser.fulfilled, (state) => {
        state.name = '';
        state.login = '';
        state.id = '';
        state.isLoading = false;
        removeLocalValue(LOCAL_STORAGE.TOKEN);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const userData = action.payload?.user;
        state.name = userData?.name || '';
        state.login = userData?.login || '';
        state.id = userData?._id || '';
        state.isLoading = false;
        state.message = action.payload?.message || null;
      })
      .addMatcher(isAnyOf(singIn.fulfilled, checkToken.fulfilled), (state, action) => {
        const userData = action.payload;
        state.name = userData?.name || '';
        state.login = userData?.login || '';
        state.id = userData?._id || '';
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          signUp.pending,
          singIn.pending,
          checkToken.pending,
          updateUser.pending,
          deleteUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.message = null;
        }
      )
      .addMatcher(
        isAnyOf(
          signUp.rejected,
          singIn.rejected,
          checkToken.rejected,
          updateUser.rejected,
          deleteUser.pending
        ),
        (state, action) => {
          state.isLoading = false;
          state.message = action.payload || null;
        }
      );
  },
});

export const { signOut, eraseErr } = userSlice.actions;
export default userSlice.reducer;
