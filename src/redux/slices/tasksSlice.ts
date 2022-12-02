import { createAsyncThunk, createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import {
  getTasksByColumn,
  createTask,
  deleteTaskById,
  getTaskSetByBoard,
  updateTaskById,
  updateTaskSet,
} from 'api/services/tasksService';
import { TTaskResExt, TTaskParams, TTaskParamsExt, TTaskSet } from 'core/types/server';
import { handlerError } from 'core/services/errorHandlerService';

interface IGlobalStateTasks {
  tasks: TTaskResExt[];
  isLoading: boolean;
  message: unknown;
}

const initialState: IGlobalStateTasks = {
  tasks: [],
  isLoading: false,
  message: null,
};

export const getAllTasksInBoardId = createAsyncThunk(
  'tasks/getAllTasks',
  async (boardId: string, { rejectWithValue }) => {
    try {
      return await getTaskSetByBoard(boardId);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

type TGetTasks = {
  boardId: string;
  columnId: string;
};

export const getTasksInColumnId = createAsyncThunk(
  'tasks/getTasks',
  async ({ boardId, columnId }: TGetTasks, { rejectWithValue }) => {
    try {
      return await getTasksByColumn(boardId, columnId);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

type TGcreatTask = {
  boardId: string;
  columnId: string;
  newTask: TTaskParams;
};

export const creatTasksInColumnId = createAsyncThunk(
  'tasks/createTask',
  async ({ boardId, columnId, newTask }: TGcreatTask, { rejectWithValue }) => {
    try {
      return await createTask(boardId, columnId, newTask);
    } catch (err) {
      return rejectWithValue(handlerError(err));
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
  'columns/updateTask',
  async ({ boardId, columnId, taskId, updateTask }: TUpdateTask, { rejectWithValue }) => {
    try {
      return await updateTaskById(boardId, columnId, taskId, updateTask);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

type TDeleteTask = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export const deleteTaskInColumnId = createAsyncThunk(
  'tasks/deleteTask',
  async ({ boardId, columnId, taskId }: TDeleteTask, { rejectWithValue }) => {
    try {
      return await deleteTaskById(boardId, columnId, taskId);
    } catch (err) {
      return rejectWithValue(handlerError(err));
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
  reducers: {
    eraseTasksErr(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksInBoardId.fulfilled, (state, action: PayloadAction<TTaskResExt[]>) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(getTasksInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt[]>) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(creatTasksInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
        state.tasks.push(action.payload);
        state.isLoading = false;
      })
      .addCase(updateTaskInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
        state.tasks = state.tasks.filter((el) => el._id !== action.payload._id);
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(deleteTaskInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
        state.tasks = state.tasks.filter((el) => el._id !== action.payload._id);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getAllTasksInBoardId.pending,
          getTasksInColumnId.pending,
          creatTasksInColumnId.pending,
          updateTaskInColumnId.pending,
          deleteTaskInColumnId.pending
        ),
        (state) => {
          state.isLoading = true;
          state.message = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllTasksInBoardId.rejected,
          getTasksInColumnId.rejected,
          creatTasksInColumnId.rejected,
          updateTaskInColumnId.rejected,
          deleteTaskInColumnId.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.message = action.payload || null;
        }
      );
  },
});

export const { eraseTasksErr } = tasksSlice.actions;
export default tasksSlice.reducer;
