import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, modalUrl, openModal }) => {
  return (
    <GalleryItem>
      <img
        src={url}
        alt=""
        onClick={() => {
          openModal(modalUrl);
        }}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
