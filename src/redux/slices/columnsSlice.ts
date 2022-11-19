import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getColumnInBoard, createColumn, deleteColumnById } from 'api/services/columnsService';
import { TColRes, TColParams } from 'core/types/server';

interface IGlobalStateColumns {
  data: TColRes[];
  isLoaded: boolean;
  error: boolean;
}

const initialState: IGlobalStateColumns = {
  data: [],
  isLoaded: false,
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
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(getColumnsInBoardId.fulfilled, (state, action: PayloadAction<TColRes[]>) => {
      state.isLoaded = true;
      state.data = action.payload;
    });
    builder.addCase(getColumnsInBoardId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });

    builder.addCase(creatColumnInBoardId.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(creatColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
      state.isLoaded = true;
      state.data.push(action.payload);
    });
    builder.addCase(creatColumnInBoardId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });

    builder.addCase(deleteColumnInBoardId.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });
    builder.addCase(deleteColumnInBoardId.fulfilled, (state, action: PayloadAction<TColRes>) => {
      state.isLoaded = true;
      state.data = state.data.filter((el) => el._id !== action.payload._id);
    });
    builder.addCase(deleteColumnInBoardId.rejected, (state) => {
      state.isLoaded = false;
      state.error = true;
    });
  },
});

export default columnsSlice.reducer;
