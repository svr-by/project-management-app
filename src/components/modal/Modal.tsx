import React, { MouseEvent } from 'react';
import { Portal } from 'components/portal/Portal';

import './Modal.scss';

type ModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen = false, onCancel, children }: ModalProps) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target?.classList.contains('modal__button') ||
      target?.classList.value === 'modal__overlay'
    ) {
      onCancel();
    }
  };

  return (
    <>
      {isOpen && (
        <Portal>
          <div className="modal__overlay" onClick={handleClick}>
            <div className="modal__window">
              <div className="modal__header">
                <input
                  className="modal__button"
                  type="button"
                  name="times"
                  onClick={handleClick}
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
