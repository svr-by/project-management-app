import axios from 'axios';
import { TUserReq, TUserRes, TSignInRes } from 'api/types';
import { SERVER_URL, LOCAL_STORAGE } from 'core/constants';
import { setLocalValue } from 'core/services/storageService';

export const authAPI = axios.create({ baseURL: SERVER_URL });

export async function signIn(login: string, password: string): Promise<TSignInRes> {
  const body = { login, password };
  const token = await authAPI.post('/auth/signin', body).then((res) => res.data);
  if (token) {
    setLocalValue<string>(LOCAL_STORAGE.TOKEN, token);
  }
  return token;
}

export function signUp(user: TUserReq): Promise<TUserRes> {
  return authAPI.post('/auth/signup', user).then((res) => res.data);
}
