import axios from 'axios';
import { SERVER_URL } from 'core/constants';

export const api = axios.create({ baseURL: SERVER_URL });
