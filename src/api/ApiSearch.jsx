import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '31504710-bca348681cce76d75d9bac8c5';

export const imagesList = async (searchValue, page, pageSize) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
  );
  return response.data.hits;
};

imagesList.propTypes = {
  searchValue: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
