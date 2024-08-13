import React from 'react';
import '../styles/NoteCard.css';

const NoteCard = () => {
  return (
    <div className='note-card'>
      <div className='note-card-content'>
        <p className='note-card-text'>
          This is a great book about following your dreams.
        </p>
        <div className='note-card-actions'></div>
      </div>
    </div>
  );
};

export default NoteCard;
