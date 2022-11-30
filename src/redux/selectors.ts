import type { RootState } from './store';

export const selectColumnsInBoardId = (state: RootState) => state.columns;
export const selectTasksInBoardId = (state: RootState) => state.tasks;
export const selectUser = (state: RootState) => state.user;
