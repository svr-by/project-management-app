import './App.scss';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Main } from '../pages/main/Main';

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
