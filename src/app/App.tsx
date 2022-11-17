import './App.scss';
import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
// import { Main } from '../pages/main/Main';
// import { LoginPage } from 'pages/login/LoginPage';
import { SignupPage } from 'pages/signup/signupPage';

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      {/* <LoginPage /> */}
      <SignupPage />
      <Footer />
    </div>
  );
}

export default App;
