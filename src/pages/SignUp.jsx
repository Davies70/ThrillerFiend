import { useState } from 'react';
import '../styles/SignIn.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { updateProfile } from 'firebase/auth';
import Loader from '../components/Loader';
import { createUser } from '../services/userServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [signInError, setSignInError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, , loading] =
    useCreateUserWithEmailAndPassword(auth);

  const header = 'Create a free account';
  const prompt = 'Sign up to create an account and save your thrills.';

  const buttonText = 'Sign up';
  const buttonColor = 'blue';
  const endPrompt = 'Already have an account?';

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(email, password);
      if (!response) {
        setSignInError('Invalid email or password. Please try again');
        return;
      }
      const { user } = response;

      await updateProfile(user, {
        displayName: userName,
      });

      await createUser(user.uid);

      setEmail('');
      setPassword('');
      setUserName('');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='signIn-Container'>
      {signInError && <Alert severity='error'>{signInError}</Alert>}
      <Box
        onSubmit={handleSignUp}
        autoComplete='off'
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          p: 4,
          borderRadius: 1,

          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          margin: 'auto',
          width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' },
        }}
        component='form'
      >
        <Box
          component='h2'
          sx={{
            textAlign: 'center',
            color: 'text.primary',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: '0',
          }}
        >
          {header}
        </Box>
        <p className='signIn-prompt'>{prompt}</p>
        <InputLabel htmlFor='username'>Username</InputLabel>
        <Input
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
          id='username'
          type='username'
        />
        <InputLabel htmlFor='email'>Email</InputLabel>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          id='email'
          type='email'
        />
        <InputLabel htmlFor='password'>Password</InputLabel>
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id='password'
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={togglePasswordVisibility}
                className='password-visibility'
                aria-label='toggle password visibility'
                edge='end'
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        <div className='signIn-buttons'>
          <Button
            variant='contained'
            color={buttonColor}
            onClick={handleSignUp}
          >
            {buttonText}
          </Button>
        </div>
      </Box>

      <p className='signUp-prompt'>
        {endPrompt}{' '}
        <Link to={'/signin'}>
          {' '}
          <span>Sign in</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
