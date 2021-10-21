import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ onClose, bigImage }) {
  useEffect(() => {
    window.addEventListener('keydown', hanldeKeyDown);
    return () => {
      window.removeEventListener('keydown', hanldeKeyDown);
    };
  });

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const hanldeKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Backdrop} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={bigImage} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  bigImage: PropTypes.string,
};
