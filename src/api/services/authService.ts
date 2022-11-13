import { api } from 'api/api';

export function signIn(login: string, password: string) {
  const body = { login, password };
  return api.post('/auth/signin', body).then((res) => res.data);
}

export function signUp(name: string, login: string, password: string) {
  const body = { name, login, password };
  return api.post('/auth/signup', body).then((res) => res.data);
}
