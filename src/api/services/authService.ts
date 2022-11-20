import axios from 'axios';
import { TSignInParams, TSignInRes, TUserPrams, TUserRes } from 'core/types/server';
import { SERVER_URL } from 'core/constants';

export const authAPI = axios.create({ baseURL: SERVER_URL });

export function signUp(user: TUserPrams): Promise<TUserRes> {
  return authAPI.post('/auth/signup', user).then((res) => res.data);
}

export async function signIn(user: TSignInParams): Promise<TSignInRes> {
  return authAPI.post('/auth/signin', user).then((res) => res.data);
}
