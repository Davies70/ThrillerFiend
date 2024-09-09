import '../styles/NoteCard.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

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
            <IconButton color='blue'>
              <EditNoteIcon />
            </IconButton>
            <IconButton color='blue'>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
