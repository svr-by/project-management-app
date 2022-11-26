import API from 'api/api';
import { TColRes, TColParams, TColParamsExt, TListColParams } from 'core/types/server';

export function getColumnInBoard(boardId: string): Promise<TColRes[]> {
  return API.get(`/boards/${boardId}/columns`).then((res) => res.data);
}

export function createColumn(boardId: string, column: TColParams): Promise<TColRes> {
  return API.post(`/boards/${boardId}/columns`, column).then((res) => res.data);
}

export function getColumnById(boardId: string, columnId: string): Promise<TColRes> {
  return API.get(`/boards/${boardId}/columns/${columnId}`).then((res) => res.data);
}

export function updateColumnById(
  boardId: string,
  columnId: string,
  column: TColParams
): Promise<TColRes> {
  return API.put(`/boards/${boardId}/columns/${columnId}`, column).then((res) => res.data);
}

export function deleteColumnById(boardId: string, columnId: string): Promise<TColRes> {
  return API.delete(`/boards/${boardId}/columns/${columnId}`).then((res) => res.data);
}

export function getColumnsList(columnIds: string[], userId: string): Promise<TColRes[]> {
  return API.get(`/columnsSet`, { params: { ids: columnIds, userId } }).then((res) => res.data);
}

export function changeColumnsList(columns: TListColParams[]): Promise<TColRes[]> {
  return API.patch(`/columnsSet`, columns).then((res) => res.data);
}

export function createColumnsList(columns: TColParamsExt[]): Promise<TColRes[]> {
  return API.post(`/columnsSet`, columns).then((res) => res.data);
}
