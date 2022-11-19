import { Route, Routes } from 'react-router-dom';
import { Welcome, Main, NotFoundPage, SignIn, SignUp, Board } from '../pages';
import { Layout } from '../layout/Layout';
import { RequireAuth } from '../hoc/RequireAuth';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route
            index
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route
            path="board"
            element={
              <RequireAuth>
                <Board />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
