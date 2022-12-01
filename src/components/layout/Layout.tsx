import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './layout.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
