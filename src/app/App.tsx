import './App.scss';
import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
// import { Main } from '../pages/main/Main';
import { LoginPage } from 'pages/login/LoginPage';

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      <LoginPage />
      <Footer />
    </div>
  );
}

export default App;
