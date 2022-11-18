import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectColumnsInBoardId = (state: RootState) => state.columns;
export const selectTasksInColumnId = (state: RootState) => state.tasks;
