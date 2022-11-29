import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getAllBoards,
  createBoard,
  updateBoardById,
  deleteBoardById,
} from 'api/services/boardsService';
import { TBoardRes, TBoardParams, TServerMessage } from 'core/types/server';
import { handlerError } from 'core/services/errorHandlerService';

interface IBoardsSate {
  boards: TBoardRes[];
  isLoading: boolean;
  message: unknown;
}

const initialState: IBoardsSate = {
  boards: [],
  isLoading: false,
  message: null,
};

export const getBoards = createAsyncThunk('boards/getBoards', async (_, { rejectWithValue }) => {
  try {
    return getAllBoards();
  } catch (err) {
    return rejectWithValue(handlerError(err));
  }
});

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (board: TBoardParams, { rejectWithValue }) => {
    try {
      const data = await createBoard(board);
      const succesMes: TServerMessage = {
        message: 'Board successfully added',
        severity: 'success',
      };
      return { board: data, message: succesMes };
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, board }: { id: string; board: TBoardParams }, { rejectWithValue }) => {
    try {
      const data = await updateBoardById(id, board);
      const succesMes: TServerMessage = {
        message: 'Board successfully updated',
        severity: 'success',
      };
      return { board: data, message: succesMes };
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

export const delBoard = createAsyncThunk(
  'boards/delBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await deleteBoardById(id);
      const succesMes: TServerMessage = {
        message: 'Board successfully deleted',
        severity: 'success',
      };
      return { board: data, message: succesMes };
    } catch (err) {
      return rejectWithValue(handlerError(err));
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    eraseErr(state) {
      state.message = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = [...action.payload];
        state.isLoading = false;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload.board);
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const boardId = action.payload.board._id;
        const boardNewTitle = action.payload.board.title;
        state.boards = state.boards.map((board) =>
          board._id !== boardId ? board : { ...board, title: boardNewTitle }
        );
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(delBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((board) => board._id !== action.payload.board._id);
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addMatcher(
        isAnyOf(getBoards.pending, addBoard.pending, updateBoard.pending, delBoard.pending),
        (state) => {
          state.isLoading = true;
          state.message = null;
        }
      )
      .addMatcher(
        isAnyOf(getBoards.rejected, addBoard.rejected, updateBoard.rejected, delBoard.rejected),
        (state, action) => {
          state.isLoading = false;
          state.message = action.payload || null;
        }
      );
  },
});

export const { eraseErr } = boardsSlice.actions;
export default boardsSlice.reducer;
