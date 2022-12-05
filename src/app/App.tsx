import { Route, Routes } from 'react-router-dom';
import {
  Welcome,
  MainPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  UserProfilePage,
  BoardPage,
} from 'pages';
import { Layout, ProtectedRoute } from 'components';
import { PATHS } from 'core/constants';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
          <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
          <Route path={PATHS.PROFILE} element={<UserProfilePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={PATHS.MAIN}>
              <Route index element={<MainPage />} />
              <Route path={PATHS.BOARD_ID} element={<BoardPage />} />
            </Route>
          </Route>
        </Route>
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
