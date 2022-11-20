import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import columnsReducer from './slices/columnsSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    user,
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
