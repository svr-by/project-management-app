import React, { MouseEvent } from 'react';
import { Portal } from 'components/portal/Portal';
import './Modal.scss';

type TModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen = false, onCancel, children }: TModalProps) => {
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
              <button className="modal__button" name="times" onClick={handleClick}></button>
              <div className="modal__body">{children}</div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
