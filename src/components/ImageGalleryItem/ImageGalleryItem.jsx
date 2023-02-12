import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ url, modalImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <GalleryItem>
      <img
        src={url}
        alt=""
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <Modal
          img={modalImg}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  modalImg: PropTypes.string.isRequired,
};
