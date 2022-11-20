import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import columnsReducer from './slices/columnsSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    // users:
    // boards:
    columns: columnsReducer,
    tasks: tasksReducer,
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
