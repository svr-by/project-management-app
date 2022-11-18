import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getColumnInBoard } from 'api/services/columnsService';
import { TColRes } from 'core/types/server';

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
  'columns/getColumns',
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
  },
});

export default columnsSlice.reducer;
