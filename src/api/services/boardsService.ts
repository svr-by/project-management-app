import API from 'api/api';
import { TBoardParams, TBoardsRes } from 'api/types';

export function getAllBoards(): Promise<TBoardsRes[]> {
  return API.get('/boards').then((res) => res.data);
}

export function createBoard(board: TBoardParams): Promise<TBoardsRes> {
  return API.post('/boards', board).then((res) => res.data);
}

export function getBoardById(id: string): Promise<TBoardsRes> {
  return API.get(`/boards/${id}`).then((res) => res.data);
}

export function updateBoardById(id: string, board: TBoardParams): Promise<TBoardsRes> {
  return API.put(`/boards/${id}`, board).then((res) => res.data);
}

export function getBoardsByIds(ids: string[]): Promise<TBoardsRes[]> {
  return API.get(`/boardsSet`, { params: ids }).then((res) => res.data);
}

export function getBoardsByUserId(userId: string[]): Promise<TBoardsRes[]> {
  return API.get(`/boardsSet/${userId}`).then((res) => res.data);
}
