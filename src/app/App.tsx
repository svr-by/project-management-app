import { Route, Routes } from 'react-router-dom';
import { Welcome, MainPage, NotFoundPage, SignInPage, SignUpPage, BoardPage } from 'pages';
import { Layout, ProtectedRoute } from 'components';
import { PATHS } from 'core/constants';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={PATHS.WELCOME} element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
          <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={PATHS.MAIN} element={<MainPage />} />
            <Route path={PATHS.BOARD} element={<BoardPage />} />
          </Route>
          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
