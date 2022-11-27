import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import boards from './slices/boardsSlice';
import columns from './slices/columnsSlice';
import tasks from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    user,
    boards,
    columns,
    tasks,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
