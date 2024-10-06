import OutsideClickHandler from '../OutsideClickHandler';
import Button from '@mui/material/Button';
import FaceBook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
// import Pinterest from '@mui/icons-material/Pinterest';

import '../../styles/Modal.css';
import PropTypes from 'prop-types';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
const ShareModal = ({ closeModal, setNotification, clearNotification }) => {
  const currentUrl = window.location.href;
  const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

  const text = 'Check out this book I found on ThrillerFiend!';
  const hashtags = 'thrillerfiend,books,thriller';

  const shareToFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=${APP_ID}&display=popup&href=${encodeURIComponent(
      currentUrl
    )}&quote=${encodeURIComponent(text)}`;
    window.open(facebookShareUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent(
      hashtags
    )}`;
    window.open(twitterShareUrl, '_blank', 'width=550,height=420');
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(
      alert('Link copied to clipboard'),
      () => {
        setNotification({
          title: 'Success',
          message: 'Link copied to clipboard',
          type: 'success',
        });
        clearNotification();
      },
      (err) => {
        console.error('Failed to copy: ', err);
      }
    );
  };

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
          onClick={shareToFacebook}
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
          onClick={shareToTwitter}
        >
          Twitter
        </Button>
        {/* <Button
          startIcon={<Pinterest />}
          variant='contained'
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Pinterest
        </Button> */}
        <Button
          startIcon={<LinkOutlinedIcon />}
          variant='contained'
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
          onClick={copyLinkToClipboard}
        >
          Copy URL
        </Button>
      </div>
    </OutsideClickHandler>
  );
};

ShareModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
};

export default ShareModal;
