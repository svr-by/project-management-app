import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Spinner } from 'components';
import App from 'app/App';
import './index.scss';
import './18n';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>
);
