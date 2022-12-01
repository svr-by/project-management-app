import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getTasksByColumn,
  createTask,
  deleteTaskById,
  getTaskSetByBoard,
  updateTaskById,
  updateTaskSet,
} from 'api/services/tasksService';
import { TTaskResExt, TTaskParams, TTaskParamsExt, TTaskSet } from 'core/types/server';

interface IGlobalStateTasks {
  data: TTaskResExt[];
  isLoading: boolean;
  error: boolean;
}

const initialState: IGlobalStateTasks = {
  data: [],
  isLoading: false,
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

type TUpdateTask = {
  boardId: string;
  columnId: string;
  taskId: string;
  updateTask: TTaskParamsExt;
};

export const updateTaskInColumnId = createAsyncThunk(
  'columns/updateTaskInBoardId',
  async ({ boardId, columnId, taskId, updateTask }: TUpdateTask, { rejectWithValue }) => {
    try {
      const data = await updateTaskById(boardId, columnId, taskId, updateTask);

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

export const deleteTaskInColumnId = createAsyncThunk(
  'tasks/deleteTaskInColumnId',
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

export const getAllTasksInBoardId = createAsyncThunk(
  'tasks/getAllTasksInBoardId',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const data = await getTaskSetByBoard(boardId);

      if (!data) {
        throw new Error('Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTasksSet = createAsyncThunk(
  'tasks/updateTasksSet',
  async (tasks: TTaskSet[], { rejectWithValue }) => {
    try {
      const data = await updateTaskSet(tasks);

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
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getTasksInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTasksInColumnId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(creatTasksInColumnId.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(creatTasksInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(creatTasksInColumnId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(updateTaskInColumnId.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateTaskInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
      state.data = state.data.filter((el) => el._id !== action.payload._id);
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(updateTaskInColumnId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(deleteTaskInColumnId.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(deleteTaskInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
      state.data = state.data.filter((el) => el._id !== action.payload._id);
      state.isLoading = false;
    });
    builder.addCase(deleteTaskInColumnId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(getAllTasksInBoardId.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(
      getAllTasksInBoardId.fulfilled,
      (state, action: PayloadAction<TTaskResExt[]>) => {
        state.data = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getAllTasksInBoardId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(updateTasksSet.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateTasksSet.fulfilled, (state, action: PayloadAction<TTaskResExt[]>) => {
      state.isLoading = false;
    });
    builder.addCase(updateTasksSet.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default tasksSlice.reducer;
