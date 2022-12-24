import { Outlet } from 'react-router-dom';
import { Header, Footer } from 'components';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">{<Outlet />}</main>
      <Footer />
    </>
  );
};
