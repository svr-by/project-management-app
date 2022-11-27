import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getColumnInBoard,
  createColumn,
  updateColumnById,
  deleteColumnById,
} from 'api/services/columnsService';
import { TColRes, TColParams } from 'core/types/server';

interface IGlobalStateColumns {
  data: TColRes[];
  isLoading: boolean;
  error: boolean;
}

const initialState: IGlobalStateColumns = {
  data: [],
  isLoading: false,
  error: false,
};

export const getColumnsInBoardId = createAsyncThunk(
  'columns/getColumnsInBoardId',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const data = await getColumnInBoard(boardId);

      if (!data) {
        throw new Error('Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type TGcreatColumn = {
  boardId: string;
  newColumn: TColParams;
};

export const creatColumnInBoardId = createAsyncThunk(
  'columns/creatColumnInBoardId',
  async ({ boardId, newColumn }: TGcreatColumn, { rejectWithValue }) => {
    try {
      const data = await createColumn(boardId, newColumn);

      if (!data) {
        throw new Error('Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type TUpdateColumn = {
  boardId: string;
  columnId: string;
  newColumn: TColParams;
};

export const updateColumnInBoardId = createAsyncThunk(
  'columns/updateColumnInBoardId',
  async ({ boardId, columnId, newColumn }: TUpdateColumn, { rejectWithValue }) => {
    try {
      const data = await updateColumnById(boardId, columnId, newColumn);

      if (!data) {
        throw new Error('Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type TDeleteColumn = {
  boardId: string;
  columnId: string;
};

export const deleteColumnInBoardId = createAsyncThunk(
  'columns/deleteColumnInBoardId',
  async ({ boardId, columnId }: TDeleteColumn, { rejectWithValue }) => {
    try {
      const data = await deleteColumnById(boardId, columnId);

      if (!data) {
        throw new Error('Error!');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumnsInBoardId.pending, (state) => {
      state.data = [];
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getColumnsInBoardId.fulfilled, (state, action: PayloadAction<TColRes[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getColumnsInBoardId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(creatColumnInBoardId.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(creatColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(creatColumnInBoardId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(updateColumnInBoardId.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
      state.data = state.data.filter((el) => el._id !== action.payload._id);
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(updateColumnInBoardId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(deleteColumnInBoardId.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(deleteColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
      state.data = state.data.filter((el) => el._id !== action.payload._id);
      state.isLoading = false;
    });
    builder.addCase(deleteColumnInBoardId.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default columnsSlice.reducer;
