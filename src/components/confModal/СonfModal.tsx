import { Button, Stack } from '@mui/material';
import { Modal } from 'components/modal/Modal';
import './СonfModal.scss';

type TConfModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

export const ConfModal = ({ isOpen = false, onCancel, onSubmit, children }: TConfModalProps) => {
  return (
    <Modal isOpen={isOpen} onCancel={onCancel}>
      <div className="conf-modal">
        {children}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onSubmit}>
            OK
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </div>
    </Modal>
  );
};
