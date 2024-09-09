import { useState } from 'react';
import '../styles/SignIn.css';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const header = 'Sign in';
  const prompt = 'Sign in to your account to access your thrills';
  const buttonText = 'Sign in';
  const buttonColor = 'blue';
  const endPrompt = "Don't have an account?";

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(email, password);
      sessionStorage.setItem('user', JSON.stringify(user));
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSigninWithGoogle = async (event) => {
    event.preventDefault();
    try {
      const response = await signInWithPopup(auth, provider);
      console.log('Successfully signed in with Google');
      console.log({ response });
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='signIn-Container'>
      <form className='signIn-Form'>
        <h1>{header}</h1>
        <p className='signIn-prompt'>{prompt}</p>
        <div className='input-groups'>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              required
              autoComplete='off'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              autoComplete='off'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
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
