import type { RootState } from './store';

export const selectBoards = (state: RootState) => state.boards;
export const selectColumnsInBoardId = (state: RootState) => state.columns;
export const selectTasksInBoardId = (state: RootState) => state.tasks;
export const selectUser = (state: RootState) => state.user;
