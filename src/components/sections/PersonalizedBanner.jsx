import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import '../../styles/PersonalizedBanner.css';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PersonalizedBanner = ({ username, booksRead, booksToRead }) => {
  return (
    <div className='personalized-banner'>
      <div className='banner-content'>
        <div className='user-info'>
          <div className='user-info-child'>
            <h2>Welcome back, {username}!</h2>
            <p>Ready for your next thrilling read?</p>
          </div>
        </div>
        <div className='user-stats'>
          <div className='stat'>
            <CheckCircleIcon className='icon' fontSize='30rem' />
            <p className='stat-value'>{booksRead}</p>
            <p className='stat-label'>
              {booksRead > 1 ? 'Books Read' : 'Book Read'}
            </p>
          </div>
          <div className='stat'>
            <BookOutlinedIcon className='icon' fontSize='30rem' />
            <p className='stat-value'>{booksToRead}</p>
            <p className='stat-label'>Want To Read</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalizedBanner.propTypes = {
  username: PropTypes.string.isRequired,
  booksRead: PropTypes.number.isRequired,
  booksToRead: PropTypes.number.isRequired,
};

export default PersonalizedBanner;
