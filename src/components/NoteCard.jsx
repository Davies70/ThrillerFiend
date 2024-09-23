import '../styles/NoteCard.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Save from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import { timeAgo } from '../utils/utils';
import { useState } from 'react';

const NoteCard = ({ noteText, created, deleteNote, updateNote, noteId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(noteText);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    setIsEditing(false);
    // Here you can add a function to save the edited text
    updateNote(editedText, noteId);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div className='note-card'>
      <div className='note-card-content'>
        {isEditing ? (
          <textarea
            type='text'
            value={editedText}
            onChange={handleTextChange}
            onBlur={handleSaveClick}
            autoFocus
            className='note-card-input'
          />
        ) : (
          <p className='note-card-text'>{noteText}</p>
        )}
      </div>
      <div className='note-card-footer'>
        <p>Added {timeAgo(created)}</p>
        <div className='note-card-btns'>
          {isEditing ? (
            <IconButton color='blue' onClick={handleSaveClick}>
              <Save />
            </IconButton>
          ) : (
            <IconButton color='blue' onClick={handleEditClick}>
              <EditNoteIcon />
            </IconButton>
          )}
          <IconButton color='blue' onClick={deleteNote}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  noteText: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  noteId: PropTypes.number.isRequired,
};

export default NoteCard;
