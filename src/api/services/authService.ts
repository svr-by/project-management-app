import axios from 'axios';
import { TSignInParams, TSignInRes, TUserPrams, TUserRes } from 'core/types/server';
import { SERVER_URL, LOCAL_STORAGE } from 'core/constants';
import { setLocalValue } from 'core/services/storageService';

export const authAPI = axios.create({ baseURL: SERVER_URL });

export function signUp(user: TUserPrams): Promise<TUserRes> {
  return authAPI.post('/auth/signup', user).then((res) => res.data);
}

export async function signIn(user: TSignInParams): Promise<TSignInRes> {
  const token = await authAPI.post('/auth/signin', user).then((res) => res.data);
  if (token) {
    setLocalValue<string>(LOCAL_STORAGE.TOKEN, token);
  }
  return token;
}
