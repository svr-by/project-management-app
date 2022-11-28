import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getAllBoards,
  createBoard,
  updateBoardById,
  deleteBoardById,
} from 'api/services/boardsService';
import { TBoardRes, TBoardParams } from 'core/types/server';

interface IBoardsSate {
  boards: TBoardRes[];
  isLoading: boolean;
}

const initialState: IBoardsSate = {
  boards: [],
  isLoading: false,
};

export const getBoards = createAsyncThunk('boards/getBoards', async () => {
  return getAllBoards();
});

export const addBoard = createAsyncThunk('boards/addBoard', async (board: TBoardParams) => {
  return createBoard(board);
});

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, board }: { id: string; board: TBoardParams }) => {
    return updateBoardById(id, board);
  }
);

export const delBoard = createAsyncThunk('boards/delBoard', async (id: string) => {
  return deleteBoardById(id);
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = [...action.payload];
        state.isLoading = false;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
        state.isLoading = false;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) =>
          board._id !== action.payload._id ? board : { ...board, title: action.payload.title }
        );
        state.isLoading = false;
      })
      .addCase(delBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(getBoards.pending, addBoard.pending, updateBoard.pending, delBoard.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(getBoards.rejected, addBoard.rejected, updateBoard.rejected, delBoard.rejected),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default boardsSlice.reducer;
