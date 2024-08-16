import React from 'react';
import '../styles/NoteCard.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteCard = () => {
  return (
    <div className='note-card'>
      <div className='note-card-content'>
        <p className='note-card-text'>
          This is a great book about following your dreams.
        </p>
        <div className='note-card-footer'>
          <div>
            <p>Added 2 days ago</p>
          </div>
          <div className='note-card-btns'>
            {' '}
            <button className='note-card-btn'>
              <EditNoteIcon />
            </button>
            <button className='note-card-btn'>
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
