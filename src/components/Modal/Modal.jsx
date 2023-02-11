import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalField } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ img, onClose }) => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  return createPortal(
    <Overlay onClick={this.handleBackdropClick}>
      <ModalField>
        <img src={img} alt="" />
      </ModalField>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
};
