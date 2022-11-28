export const SERVER_URL = 'https://pma-backend-svr.up.railway.app/';

export enum PATHS {
  WELCOME = '',
  SIGN_UP = 'signup',
  SIGN_IN = 'signin',
  PROFILE = 'profile',
  MAIN = 'main',
  BOARD_ID = ':boardId',
  NOT_FOUND = '*',
}

export enum LOCAL_STORAGE {
  TOKEN = 'token',
}

export enum ERROR_MES {
  EMPTY = 'This field is required',
  MIN_LENGHTS_5 = 'The min length is 5 chars',
  MAX_LENGHTS_100 = 'The max length is 100 chars',
}
