import { useState } from 'react';
import '../styles/SignIn.css';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Alert from '@mui/material/Alert';
import Loader from '../components/Loader';
import { createUser, doesUserExist } from '../services/userServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signInWithEmailAndPassword, , loading] =
    useSignInWithEmailAndPassword(auth);
  const [signInError, setSignInError] = useState(null);

  const navigate = useNavigate();

  const header = 'Sign in';
  const prompt = 'Sign in to your account and access your thrills';
  const buttonText = 'Sign in';
  const buttonColor = 'blue';
  const endPrompt = "Don't have an account?";

  const handleSignIn = async (event) => {
    event.preventDefault();
    setSignInError(null);
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result) {
        const user = result.user;
        sessionStorage.setItem('user', JSON.stringify(user));
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        setSignInError('Invalid email or password. Please try again');
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  const handleSigninWithGoogle = async (event) => {
    event.preventDefault();
    setSignInError(null);

    try {
      const response = await signInWithPopup(auth, provider);
      if (response) {
        const user = response.user;
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log('Successfully signed in with Google');
        setEmail('');
        setPassword('');
        const userExists = await doesUserExist(user.uid);
        if (userExists) {
          navigate('/');
          return;
        }
        await createUser(user.uid);
        navigate('/');
      } else {
        setSignInError('An error occurred while signing in with Google');
      }
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
        onSubmit={handleSignIn}
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
            onClick={handleSignIn}
          >
            {buttonText}
          </Button>
          <div className='divider-container'>
            <hr className='divider'></hr>
            <span>or</span>
            <hr className='divider'></hr>
          </div>

          <Button
            variant='contained'
            color='secondary'
            startIcon={<Google />}
            onClick={handleSigninWithGoogle}
          >
            Continue with Google
          </Button>
        </div>
      </Box>
      <p className='signUp-prompt'>
        {endPrompt}{' '}
        <Link to={'/signup'}>
          {' '}
          <span>Sign up for free</span>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
