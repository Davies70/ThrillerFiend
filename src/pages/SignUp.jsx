import { useState } from 'react';
import '../styles/SignIn.css';
import Button from '@mui/material/Button';

import { Link, useNavigate } from 'react-router-dom';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const header = 'Sign up for free';
  const prompt = 'Sign up to create an account and save your thrills.';

  const buttonText = 'Sign up';
  const buttonColor = 'blue';
  const endPrompt = 'Already have an account?';

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(email, password);
      console.log({ response });
      setEmail('');
      navigate('/');
      setPassword('');
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
              placeholder='name@example.com'
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
              placeholder={'At least 6 characters'}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>

        <div className='signIn-buttons'>
          <Button
            variant='contained'
            color={buttonColor}
            onClick={handleSignUp}
          >
            {buttonText}
          </Button>
          {/* <div className='divider-container'>
            <hr className='divider'></hr>
            <span>or</span>
            <hr className='divider'></hr>
          </div>

          <Button variant='contained' color='secondary' startIcon={<Google />}>
            Continue with Google
          </Button> */}
        </div>
      </form>
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
