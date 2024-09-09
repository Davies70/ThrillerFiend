
import OutsideClickHandler from '../OutsideClickHandler';
import Rating from '@mui/material/Rating';
import '../../styles/Modal.css';
import PropTypes from 'prop-types';

const RatingModal = ({ closeModal }) => {
  return (
    <OutsideClickHandler className='modal' onOutsideClick={closeModal}>
      <h2>Rate this book</h2>

      <Rating name='rating' defaultValue={0} precision={0.5} />
    </OutsideClickHandler>
  );
};

RatingModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default RatingModal;
