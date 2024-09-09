import React, { useState } from 'react';
import '../styles/SignIn.css';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';
import Facebook from '@mui/icons-material/Facebook';

const SignIn = () => {
  const [signUp, setSignUp] = useState(true);

  const header = signUp ? 'Sign up for free' : 'Sign in';
  const prompt = signUp
    ? 'Sign up to create an account and save your thrills.'
    : 'Sign in to your account to access your thrills';
  const buttonText = signUp ? 'Sign up for free' : 'Sign in';
  const buttonColor = signUp ? 'blue' : 'ochre';
  const endPrompt = signUp
    ? 'Already have an account?'
    : "Don't have an account?";

  const endPromptButtonText = signUp ? 'Sign in' : 'Sign up for free';

  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  return (
    <div className='signIn-Container'>
      <form className='signIn-Form'>
        <h1>{header}</h1>
        <p className='signIn-prompt'>{prompt}</p>
        <div className='input-groups'>
          {signUp && (
            <div className='input-group'>
              <label htmlFor='email'>Your Name</label>

              <input
                type='email'
                placeholder='First and last name'
                required
                autoComplete='off'
              />
            </div>
          )}

          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='name@example.com'
              required
              autoComplete='off'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              autoComplete='off'
              placeholder={signUp ? 'At least 6 characters' : ''}
            />
          </div>
        </div>

        <div className='signIn-buttons'>
          <Button variant='contained' color={buttonColor}>
            {buttonText}
          </Button>
          <div className='divider-container'>
            <hr className='divider'></hr>
            <span>or</span>
            <hr className='divider'></hr>
          </div>

          <Button variant='contained' color='secondary' startIcon={<Google />}>
            Continue with Google
          </Button>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<Facebook />}
          >
            Continue with Facebook
          </Button>
        </div>
      </form>
      <p className='signUp-prompt'>
        {endPrompt}{' '}
        <button onClick={handleSignUp}>{endPromptButtonText}</button>
      </p>
    </div>
  );
};

export default SignIn;
