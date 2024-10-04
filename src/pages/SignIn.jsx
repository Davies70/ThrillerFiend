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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , loading] =
    useSignInWithEmailAndPassword(auth);
  const [signInError, setSignInError] = useState(null);

  const navigate = useNavigate();

  const header = 'Sign in';
  const prompt = 'Sign in to your account to access your thrills';
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
      <form className='signIn-Form'>
        <h1>{header}</h1>
        <p className='signIn-prompt'>{prompt}</p>
        {signInError && <Alert severity='error'>{signInError}</Alert>}
        <div className='input-groups'>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              required
              autoComplete='off'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              id='email'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              autoComplete='off'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id='password'
            />
          </div>
        </div>

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
      </form>
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
