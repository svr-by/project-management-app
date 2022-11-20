import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllBoards, createBoard } from 'api/services/boardsService';
import { TBoardRes, TBoardParams } from 'core/types/server';

interface IMainSate {
  boards: TBoardRes[];
}

const initialState: IMainSate = {
  boards: [],
};

export const getBoards = createAsyncThunk('main/getBoards', async () => {
  return getAllBoards();
});

export const addBoard = createAsyncThunk('main/addBoard', async (board: TBoardParams) => {
  return createBoard(board);
});

const userSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = [...action.payload];
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      });
  },
});

export default userSlice.reducer;
