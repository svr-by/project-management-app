import API from 'api/api';
import { TFileRes, TFileParams } from 'api/types';

export function getFiles(ids?: string[], userId?: string, taskId?: string): Promise<TFileRes[]> {
  return API.get(`/file`, { params: { ids, userId, taskId } }).then((res) => res.data);
}

export function uploadFile(file: TFileParams): Promise<TFileRes[]> {
  return API.post(`/file`, file).then((res) => res.data);
}

export function getFilesByBoardId(boardId: string): Promise<TFileRes[]> {
  return API.get(`/file/${boardId}`).then((res) => res.data);
}

export function deleteFileById(fileId: string): Promise<TFileRes> {
  return API.delete(`/file/${fileId}`).then((res) => res.data);
}
