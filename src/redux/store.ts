import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import main from './slices/mainSlice';

export const store = configureStore({
  reducer: { user, main },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
