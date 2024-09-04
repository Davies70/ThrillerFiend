import React from 'react';
import OutsideClickHandler from '../OutsideClickHandler';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Proptypes from 'prop-types';
import '../../styles/Modal.css';

const LibraryModal = ({ closeModal }) => {
  return (
    <OutsideClickHandler onOutsideClick={closeModal} className='modal'>
      <h2>Collection</h2>
      <div className='modal-buttons'>
        <Button
          variant='contained'
          endIcon={<CheckBoxIcon />}
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Have Read
        </Button>

        <Button
          variant='contained'
          endIcon={<TurnedInIcon />}
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Read Later
        </Button>

        <Button
          variant='contained'
          endIcon={<FavoriteIcon />}
          color='white'
          size='small'
          disableElevation
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Add to Favorites
        </Button>

        <Button
          variant='contained'
          endIcon={<DeleteIcon />}
          color='white'
          size='small'
          disableElevation
          title='Remove from Library'
          fullWidth
          style={{ justifyContent: 'flex-start' }}
        >
          Remove from Library
        </Button>
      </div>
    </OutsideClickHandler>
  );
};

LibraryModal.propTypes = {
  closeModal: Proptypes.func.isRequired,
};

export default LibraryModal;
