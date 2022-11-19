import API from 'api/api';
import { TTaskRes, TTaskResExt, TTaskParams, TTaskParamsExt, TTaskSet } from 'core/types/server';

export function getTasksByColumn(boardId: string, columnId: string): Promise<TTaskResExt[]> {
  return API.get(`/boards/${boardId}/columns/${columnId}/tasks`).then((res) => res.data);
}

export function createTask(
  boardId: string,
  columnId: string,
  task: TTaskParams
): Promise<TTaskResExt> {
  return API.post(`/boards/${boardId}/columns/${columnId}/tasks`, task).then((res) => res.data);
}

export function getTaskById(
  boardId: string,
  columnId: string,
  taskId: string
): Promise<TTaskResExt> {
  return API.get(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`).then((res) => res.data);
}

export function updateTaskById(
  boardId: string,
  columnId: string,
  taskId: string,
  task: TTaskParamsExt
): Promise<TTaskResExt> {
  return API.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, task).then(
    (res) => res.data
  );
}

export function deleteTaskById(
  boardId: string,
  columnId: string,
  taskId: string
): Promise<TTaskResExt> {
  return API.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`).then(
    (res) => res.data
  );
}

export function getTaskSet(ids: string[], userId: string, search: string): Promise<TTaskResExt[]> {
  return API.get(`/taskSet`, { params: { ids, userId, search } }).then((res) => res.data);
}

export function updateTaskSet(tasks: TTaskSet): Promise<TTaskResExt[]> {
  return API.patch(`/taskSet`, tasks).then((res) => res.data);
}

export function getTaskSetByBoard(boardId: string): Promise<TTaskResExt[]> {
  return API.get(`/taskSet/${boardId}`).then((res) => res.data);
}
