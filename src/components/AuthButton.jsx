import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthButton = ({ loading, user, handleSignOut, dontShowSignInButton }) => {
  if (loading) {
    return (
      <li className='auth-button-wrapper'>
        <LoadingButton
          loading
          variant='contained'
          sx={{
            borderRadius: '1.5rem',
            minWidth: '80px', // Ensure consistent width
          }}
          size='small'
        />
      </li>
    );
  }

  if (user) {
    return (
      <li className='auth-button-wrapper'>
        <Button
          onClick={handleSignOut}
          variant='contained'
          color='ochre'
          sx={{
            borderRadius: '1.5rem',
            minWidth: '80px', // Ensure consistent width
          }}
          size='small'
        >
          Sign out
        </Button>
      </li>
    );
  }

  if (!dontShowSignInButton) {
    return (
      <li className='auth-button-wrapper'>
        <Button
          variant='contained'
          sx={{
            borderRadius: '1.5rem',
            minWidth: '80px', // Ensure consistent width
          }}
          size='small'
        >
          <Link to='/signin'>Sign in</Link>
        </Button>
      </li>
    );
  }

  return null;
};

AuthButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  handleSignOut: PropTypes.func.isRequired,
  dontShowSignInButton: PropTypes.bool.isRequired,
};

export default AuthButton;
