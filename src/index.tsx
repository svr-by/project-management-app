import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from 'app/App';
import './index.scss';
import { Board } from 'app/components/Board/Board';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Board />
    </Provider>
  </React.StrictMode>
);
