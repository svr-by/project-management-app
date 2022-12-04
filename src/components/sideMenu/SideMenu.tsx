import { Link } from 'react-router-dom';
import { PATHS } from 'core/constants';
import { LangSwitch, ThemeSwitcher } from 'components';
import { useTranslation } from 'react-i18next';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import './SideMenu.scss';

type TSideMenu = {
  isAuth: boolean;
  isOpen: boolean;
  onClose: () => void;
  openBoardModal: () => void;
  handleSignOut: () => void;
};

export const SideMenu = (props: TSideMenu) => {
  const { isOpen, onClose, isAuth, openBoardModal, handleSignOut } = props;
  const { t } = useTranslation();

  return (
    <Drawer
      className="side-menu"
      anchor="right"
      open={isOpen}
      onClose={onClose}
      transitionDuration={500}
    >
      <nav className="side-menu__nav" onClick={onClose}>
        <List className="side-menu__list">
          {isAuth ? (
            <>
              <ListItem disablePadding className="side-menu__list-item">
                <ListItemButton onClick={openBoardModal}>
                  <ListItemIcon>
                    <AddBoxOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('Create board')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="side-menu__list-item">
                <Link to={PATHS.PROFILE}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PortraitOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('Edit profile')} />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding className="side-menu__list-item">
                <ListItemButton onClick={handleSignOut}>
                  <ListItemIcon>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('Sign out')} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding className="side-menu__list-item">
                <Link to={PATHS.SIGN_IN}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LoginOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('sign in')} />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding className="side-menu__list-item">
                <Link to={PATHS.SIGN_UP}>
                  <ListItemButton>
                    <ListItemIcon>
                      <HowToRegOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('sign up')} />
                  </ListItemButton>
                </Link>
              </ListItem>
            </>
          )}
          <ListItem disablePadding className="side-menu__switch">
            <ThemeSwitcher />
          </ListItem>
          <ListItem disablePadding className="side-menu__switch">
            <LangSwitch />
          </ListItem>
        </List>
        <Divider />
      </nav>
    </Drawer>
  );
};
