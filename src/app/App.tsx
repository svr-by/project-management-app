import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { checkUser } from 'redux/slices/userSlice';
import { Welcome, MainPage, NotFoundPage, SignInPage, SignUpPage, BoardPage } from 'pages';
import { Layout, ProtectedRoute } from 'components';
import { PATHS } from 'core/constants';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route path={PATHS.HOME} element={<Layout />}>
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
