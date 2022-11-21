import React from 'react';
import { Portal } from 'components/portal/Portal';

import './Modal.scss';

type ModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen = false, onCancel, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className="modal__overlay">
            <div className="modal__window">
              <div className="modal__header">
                <input
                  className="modal__button"
                  type="button"
                  name="times"
                  onClick={onCancel}
                  value="X"
                />
              </div>
              <div className="modal__body">{children}</div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export { Modal };
