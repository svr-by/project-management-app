import { useState, useEffect } from 'react';
import { TServerMessage } from 'core/types/server';
import { Snackbar, Alert } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

type TToastMessageProps = {
  message: TServerMessage;
};

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export const ToastMessage = ({ message }: TToastMessageProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    message ? setOpen(true) : setOpen(false);
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    message && (
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={message.message}
      >
        <Alert severity={message.severity} variant="filled">
          {message.message}
        </Alert>
      </Snackbar>
    )
  );
};
