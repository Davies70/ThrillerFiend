import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import '../../styles/PersonalizedBanner.css';
import PropTypes from 'prop-types';

const PersonalizedBanner = ({ username, booksRead, favoriteGenre }) => {
  return (
    <div className='personalized-banner'>
      <div className='banner-content'>
        <div className='user-info'>
          <div className='user-info-child'>
            <h2>
              Welcome back, <span>{username}!</span>
            </h2>
            <p>Ready for your next thrilling read?</p>
          </div>
        </div>
        <div className='user-stats'>
          <div className='stat'>
            <BookOutlinedIcon className='icon' fontSize='30rem' />
            <p className='stat-value'>{booksRead}</p>
            <p className='stat-label'>Books Read</p>
          </div>
          <div className='stat'>
            <StarBorderOutlinedIcon className='icon' fontSize='30rem' />
            <p className='stat-value'>{favoriteGenre}</p>
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
  favoriteGenre: PropTypes.string.isRequired,
};

export default PersonalizedBanner;
