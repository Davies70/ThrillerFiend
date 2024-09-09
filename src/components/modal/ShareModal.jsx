
import OutsideClickHandler from '../OutsideClickHandler';
import Button from '@mui/material/Button';
import FaceBook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Pinterest from '@mui/icons-material/Pinterest';

import '../../styles/Modal.css';
import PropTypes from 'prop-types';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

const ShareModal = ({ closeModal }) => {
  return (
    <OutsideClickHandler onOutsideClick={closeModal} className='modal'>
      <h2>Share</h2>
      <div className='modal-buttons'>
        <Button
          startIcon={<FaceBook />}
          variant='contained'
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Facebook
        </Button>
        <Button
          startIcon={<Twitter />}
          variant='contained'
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Twitter
        </Button>
        <Button
          startIcon={<Pinterest />}
          variant='contained'
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Pinterest
        </Button>
        <Button
          startIcon={<LinkOutlinedIcon />}
          variant='contained'
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Copy URL
        </Button>
      </div>
    </OutsideClickHandler>
  );
};

ShareModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ShareModal;
