import API from 'api/api';
import { TUserPrams, TUserRes } from 'core/types/server';

export function getAllUsers(): Promise<TUserRes[]> {
  return API.get('/users').then((res) => res.data);
}

export function getUserById(id: string): Promise<TUserRes> {
  return API.get(`/users/${id}`).then((res) => res.data);
}

export function updateUserById(id: string, user: TUserPrams): Promise<TUserRes> {
  return API.post(`/users/${id}`, user).then((res) => res.data);
}

export function deleteUserById(id: string): Promise<TUserRes> {
  return API.delete(`/users/${id}`).then((res) => res.data);
}
