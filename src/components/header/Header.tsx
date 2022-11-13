import LogoKanban from '../../assets/img/kanban-1.svg';
import { Button } from '../button/Button';
import './Header.scss';

export const Header = () => {
  return (
    <div>
      <div>
        <img src={LogoKanban} alt="LogoKanban" />
        <p>Kanban</p>
      </div>
      <div>
        <Button naming="Sign in" />
        <Button naming="Sign up" />
        <Button naming="Change language" />
      </div>
    </div>
  );
};
