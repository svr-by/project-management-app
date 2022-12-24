import API from 'api/api';
import { TPointRes, TPointParams, TPointParamsExt, TListPointParams } from 'core/types/server';

export function getPoints(ids?: string[], userId?: string): Promise<TPointRes[]> {
  return API.get(`/points`, { params: { ids, userId } }).then((res) => res.data);
}

export function createPoint(point: TPointParamsExt): Promise<TPointRes> {
  return API.post(`/points`, point).then((res) => res.data);
}

export function updatePointsSet(points: TListPointParams[]): Promise<TPointRes[]> {
  return API.patch(`/points`, points).then((res) => res.data);
}

export function getPointsByTaskId(taskId: string): Promise<TPointRes[]> {
  return API.get(`/points/${taskId}`).then((res) => res.data);
}

export function updatePoint(pointId: string, point: TPointParams): Promise<TPointRes> {
  return API.patch(`/points/${pointId}`, point).then((res) => res.data);
}

export function deletePoint(pointId: string): Promise<TPointRes> {
  return API.delete(`/points/${pointId}`).then((res) => res.data);
}
