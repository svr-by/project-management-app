import type { RootState } from './store';

export const selectColumnsInBoardId = (state: RootState) => state.columns;
export const selectTasksInColumnId = (state: RootState) => state.tasks;
