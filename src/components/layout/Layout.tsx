import { Outlet } from 'react-router-dom';
import { Header, Footer } from 'components';
import './layout.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">{<Outlet />}</main>
      <Footer />
    </>
  );
};
