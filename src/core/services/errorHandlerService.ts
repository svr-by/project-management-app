import axios from 'axios';

export function handlerError(err: unknown) {
  let errorMes = 'Unexpected error';
  if (axios.isAxiosError(err)) {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          errorMes = 'Bad Request';
          break;
        case 401:
          errorMes = 'Authorization error';
          break;
        case 404:
          errorMes = 'Not founded!';
          break;
        case 409:
          errorMes = 'Already exist';
          break;
      }
    } else if (err.request) {
      errorMes = 'Network error';
    }
  }
  return {
    message: errorMes,
    severity: 'error',
  };
}
