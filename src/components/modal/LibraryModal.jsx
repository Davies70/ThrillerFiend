import OutsideClickHandler from '../OutsideClickHandler';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Proptypes from 'prop-types';
import '../../styles/Modal.css';
import { addBookStatus, removeBookStatus } from '../../services/userServices';

const LibraryModal = ({
  closeModal,
  bookId,
  userId,
  bookState,
  setBookState,
}) => {
  const toggleState = async (stateKey) => {
    try {
      if (bookState[stateKey]) {
        await removeBookStatus(userId, bookId, stateKey);
      } else {
        await addBookStatus(userId, bookId, stateKey);
      }
      setBookState((prevState) => ({
        ...prevState,
        [stateKey]: !prevState[stateKey],
      }));
    } catch (error) {
      console.error(`Error toggling ${stateKey}:`, error);
    }
  };

  console.log('bookState:', bookState);

  return (
    <OutsideClickHandler onOutsideClick={closeModal} className='modal'>
      <h2>Collection</h2>
      <div className='modal-buttons'>
        <Button
          variant='contained'
          endIcon={
            bookState.haveRead ? <DeleteIcon color='red' /> : <CheckBoxIcon />
          }
          color={bookState.haveRead ? 'blue' : 'white'}
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start', marginBottom: '10px' }}
          onClick={() => toggleState('haveRead')}
          disabled={bookState.readLater}
          title={bookState.haveRead ? 'Remove from Have Read' : 'Have Read'}
        >
          {bookState.haveRead ? 'Added to Have Read' : 'Have Read'}
        </Button>

        <Button
          variant='contained'
          endIcon={
            bookState.readLater ? <DeleteIcon color='red' /> : <TurnedInIcon />
          }
          color={bookState.readLater ? 'blue' : 'white'}
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start', marginBottom: '10px' }}
          onClick={() => toggleState('readLater')}
          disabled={bookState.haveRead}
          title={bookState.readLater ? 'Remove from Read Later' : 'Read Later'}
        >
          {bookState.readLater ? 'Added to Read Later' : 'Read Later'}
        </Button>

        <Button
          variant='contained'
          endIcon={
            bookState.favorites ? <DeleteIcon color='red' /> : <FavoriteIcon />
          }
          color={bookState.favorites ? 'blue' : 'white'}
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start', marginBottom: '10px' }}
          onClick={() => toggleState('favorites')}
          title={
            bookState.favorites ? 'Remove from Favorites' : 'Add to Favorites'
          }
        >
          {bookState.favorites ? 'Added to Favorites' : 'Add to Favorites'}
        </Button>
      </div>
    </OutsideClickHandler>
  );
};

LibraryModal.propTypes = {
  closeModal: Proptypes.func.isRequired,
  bookId: Proptypes.string.isRequired,
  userId: Proptypes.string.isRequired,
  bookState: Proptypes.object.isRequired,
  setBookState: Proptypes.func.isRequired,
};

export default LibraryModal;
