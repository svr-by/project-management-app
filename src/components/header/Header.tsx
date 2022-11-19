import { useEffect, useState } from 'react';
import LogoKanban from '../../assets/img/kanban-1.svg';
import { Button } from '../button/Button';
import './Header.scss';
import CustomizedSwitches from '../switch/Switch';
import CustomLink from '../customLink/CustomLink';

export const Header = () => {
  const [backColor, setBackColor] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setBackColor(window.scrollY);
  };

  return (
    <header className={backColor ? 'header scroll' : 'header'}>
      <div className="logo">
        <img src={LogoKanban} alt="LogoKanban" className="logo__image" />
        <p className="logo__description">Kanban</p>
      </div>
      <nav className="navigation">
        <CustomizedSwitches />
        <CustomLink to="/sign-in" child="Sign in" />
        <CustomLink to="/sign-up" child="Sign up" />
      </nav>
    </header>
  );
};
