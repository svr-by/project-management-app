import { Backdrop, CircularProgress } from '@mui/material';
import './Spinner.scss';

export const Spinner = ({ open = true, backdrop = false }) => {
  return backdrop ? (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="spinner__wrapper">
      <CircularProgress color="inherit" />
    </div>
  );
};
