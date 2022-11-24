import API from 'api/api';
import { TBoardParams, TBoardRes } from 'core/types/server';

export function getAllBoards(): Promise<TBoardRes[]> {
  return API.get('/boards').then((res) => res.data);
}

export function createBoard(board: TBoardParams): Promise<TBoardRes> {
  return API.post('/boards', board).then((res) => res.data);
}

export function getBoardById(id: string): Promise<TBoardRes> {
  return API.get(`/boards/${id}`).then((res) => res.data);
}

export function updateBoardById(id: string, board: TBoardParams): Promise<TBoardRes> {
  return API.put(`/boards/${id}`, board).then((res) => res.data);
}

export function deleteBoardById(id: string): Promise<TBoardRes> {
  return API.delete(`/boards/${id}`).then((res) => res.data);
}

export function getBoardsByIds(ids: string[]): Promise<TBoardRes[]> {
  return API.get(`/boardsSet`, { params: { ids } }).then((res) => res.data);
}

export function getBoardsByUserId(userId: string[]): Promise<TBoardRes[]> {
  return API.get(`/boardsSet/${userId}`).then((res) => res.data);
}
