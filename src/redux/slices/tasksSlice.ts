import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksByColumn } from 'api/services/tasksService';
import { TTaskResExt } from 'core/types/server';

interface IGlobalStateTasks {
  data: TTaskResExt[];
  isLoaded: boolean;
  error: boolean;
}

type TGetTasks = {
  boardId: string;
  columnId: string;
};

const initialState: IGlobalStateTasks = {
  data: [],
  isLoaded: false,
  error: false,
};

export const getTasksInColumnId = createAsyncThunk(
  'tasks/getTasks',
  async ({ boardId, columnId }: TGetTasks, { rejectWithValue }) => {
    try {
      const data = await getTasksByColumn(boardId, columnId);

      if (!data) {
        throw new Error('Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksInColumnId.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(getTasksInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt[]>) => {
      state.isLoaded = true;
      state.data = action.payload;
    });
    builder.addCase(getTasksInColumnId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });
  },
});

export default tasksSlice.reducer;
