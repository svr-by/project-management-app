import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksByColumn, createTask, deleteTaskById, getTaskSetByBoard, updateTaskById } from 'api/services/tasksService';
import { TTaskResExt, TTaskParams, TTaskParamsExt } from 'core/types/server';

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

//! Вытягиваем все таски одной борды:

// export const getAllTasksInBoardId = createAsyncThunk(
//   'tasks/getAllTasksInBoardId',
//   async (boardId: string, { rejectWithValue }) => {
//     try {
//       const data = await getTaskSetByBoard(boardId);

//       if (!data) {
//         throw new Error('Error!');
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );




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
  taskId: string,
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // builder.addCase(getAllTasksInBoardId.pending, (state) => {
    //   state.isLoaded = false;
    //   state.error = false;
    // });
    // builder.addCase(getAllTasksInBoardId.fulfilled, (state, action: PayloadAction<TTaskResExt[]>) => {
    //   state.isLoaded = true;
    //   state.data = action.payload;
    // });
    // builder.addCase(getAllTasksInBoardId.rejected, (state) => {
    //   state.isLoaded = false;
    //   state.error = true;
    // });

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

    builder.addCase(updateTaskInColumnId.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(updateTaskInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
      state.isLoaded = true;
      state.data = state.data.filter((el) => el._id !== action.payload._id);
      state.data.push(action.payload);
    });
    builder.addCase(updateTaskInColumnId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });

    builder.addCase(deleteTaskInColumnId.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(deleteTaskInColumnId.fulfilled, (state, action: PayloadAction<TTaskResExt>) => {
      state.isLoaded = true;
      state.data = state.data.filter((el) => el._id !== action.payload._id);
    });
    builder.addCase(deleteTaskInColumnId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });
  },
});

export default tasksSlice.reducer;
