import PropTypes from 'prop-types';

export const ErrorMassage = ({ name }) => {
  return (
    <div>
      <h2>Sorry! There is no images on {name} request! Try something else!</h2>
      <br />
      <img
        src="https://www.sltrib.com/resizer/58dwqLIpP173aaQqJ3Ih-qcR2Bk=/1024x650/arc-anglerfish-arc2-prod-sltrib.s3.amazonaws.com/public/H5G2HUXM7VGMNKJC2QO4GIPQRM.jpg"
        alt="404"
      />
    </div>
  );
};

ErrorMassage.propTypes = {
  name: PropTypes.string.isRequired,
};
