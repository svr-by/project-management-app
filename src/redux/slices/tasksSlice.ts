import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksByColumn, createTask, deleteTaskById } from 'api/services/tasksService';
import { TTaskResExt, TTaskParams } from 'core/types/server';

interface IGlobalStateTasks {
  data: TTaskResExt[];
  isLoaded: boolean;
  error: boolean;
}

const initialState: IGlobalStateTasks = {
  data: [],
  isLoaded: false,
  error: false,
};

type TGetTasks = {
  boardId: string;
  columnId: string;
};

export const getTasksInColumnId = createAsyncThunk(
  'tasks/getTasksInColumnId',
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

type TGcreatTask = {
  boardId: string;
  columnId: string;
  newTask: TTaskParams;
};

export const creatTasksInColumnId = createAsyncThunk(
  'tasks/creatTasksInColumnId',
  async ({ boardId, columnId, newTask }: TGcreatTask, { rejectWithValue }) => {
    try {
      const data = await createTask(boardId, columnId, newTask);

      if (!data) {
        throw new Error('Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type TDeleteTask = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export const deleteTasksInColumnId = createAsyncThunk(
  'tasks/deleteTasksInColumnId',
  async ({ boardId, columnId, taskId }: TDeleteTask, { rejectWithValue }) => {
    try {
      const data = await deleteTaskById(boardId, columnId, taskId);

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

    builder.addCase(creatTasksInColumnId.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(creatTasksInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
      state.isLoaded = true;
      state.data.push(action.payload);
    });
    builder.addCase(creatTasksInColumnId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });

    builder.addCase(deleteTasksInColumnId.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(deleteTasksInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
      state.isLoaded = true;
      state.data = state.data.filter((el) => el._id !== action.payload._id);
    });
    builder.addCase(deleteTasksInColumnId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });
  },
});

export default tasksSlice.reducer;
