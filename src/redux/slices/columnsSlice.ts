import { createAsyncThunk, createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import {
  getColumnInBoard,
  createColumn,
  updateColumnById,
  deleteColumnById,
  changeColumnsList,
} from 'api/services/columnsService';
import { TColRes, TColParams, TListColParams } from 'core/types/server';
import { handlerError } from 'core/services/errorHandlerService';

interface IGlobalStateColumns {
  columns: TColRes[];
  isLoading: boolean;
  message: unknown;
}

const initialState: IGlobalStateColumns = {
  columns: [],
  isLoading: false,
  message: null,
};

export const getColumnsInBoardId = createAsyncThunk(
  'columns/getColumns',
  async (boardId: string, { rejectWithValue }) => {
    try {
      return await getColumnInBoard(boardId);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

type TGcreatColumn = {
  boardId: string;
  newColumn: TColParams;
};

export const creatColumnInBoardId = createAsyncThunk(
  'columns/creatColumn',
  async ({ boardId, newColumn }: TGcreatColumn, { rejectWithValue }) => {
    try {
      return await createColumn(boardId, newColumn);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

type TUpdateColumn = {
  boardId: string;
  columnId: string;
  newColumn: TColParams;
};

export const updateColumnInBoardId = createAsyncThunk(
  'columns/updateColumn',
  async ({ boardId, columnId, newColumn }: TUpdateColumn, { rejectWithValue }) => {
    try {
      return await updateColumnById(boardId, columnId, newColumn);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

type TDeleteColumn = {
  boardId: string;
  columnId: string;
};

export const deleteColumnInBoardId = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardId, columnId }: TDeleteColumn, { rejectWithValue }) => {
    try {
      return await deleteColumnById(boardId, columnId);
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

export const updateOrderedColumnsInBoardId = createAsyncThunk(
  'columns/updateOrderedColumnsInBoardId',
  async (columns: TListColParams[], { rejectWithValue }) => {
    try {
      const data = await changeColumnsList(columns);

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
  reducers: {
    eraseColumnState(state) {
      state.message = null;
    },
    changeColumnsState(state, action: PayloadAction<TColRes[]>) {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumnsInBoardId.fulfilled, (state, action: PayloadAction<TColRes[]>) => {
        state.columns = action.payload;
        state.isLoading = false;
      })
      .addCase(creatColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
        state.columns.push(action.payload);
        state.isLoading = false;
      })
      .addCase(updateColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
        state.columns = state.columns.filter((el) => el._id !== action.payload._id);
        state.columns.push(action.payload);
        state.isLoading = false;
      })
      .addCase(deleteColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
        state.columns = state.columns.filter((el) => el._id !== action.payload._id);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getColumnsInBoardId.pending,
          creatColumnInBoardId.pending,
          updateColumnInBoardId.pending,
          deleteColumnInBoardId.pending
        ),
        (state) => {
          state.isLoading = true;
          state.message = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getColumnsInBoardId.rejected,
          creatColumnInBoardId.rejected,
          updateColumnInBoardId.rejected,
          deleteColumnInBoardId.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.message = action.payload || null;
        }
      );
  },
});

export const { eraseColumnState, changeColumnsState } = columnsSlice.actions;
export default columnsSlice.reducer;
