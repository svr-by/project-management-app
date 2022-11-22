import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllBoards,
  createBoard,
  updateBoardById,
  deleteBoardById,
} from 'api/services/boardsService';
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

export const udateBoard = createAsyncThunk(
  'main/udateBoard',
  async ({ id, board }: { id: string; board: TBoardParams }) => {
    return updateBoardById(id, board);
  }
);

export const delBoard = createAsyncThunk('main/delBoard', async (id: string) => {
  return deleteBoardById(id);
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
      })
      .addCase(udateBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) =>
          board._id !== action.payload._id ? board : { ...board, title: action.payload.title }
        );
      })
      .addCase(delBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
      });
  },
});

export default userSlice.reducer;
