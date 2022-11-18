import './App.scss';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Main } from '../pages/main/Main';
import { Board } from 'app/components/Board/Board';

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      <Board boardId={boardId} />
      <Footer />
    </div>
  );
}

export default App;
