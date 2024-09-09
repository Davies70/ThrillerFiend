import React, { useState } from 'react';
import '../styles/SignIn.css';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';

const SignIn = () => {
  const [signUp, setSignUp] = useState(true);

  const header = signUp ? 'Sign Up' : 'Sign In';
  const prompt = signUp
    ? 'Sign up to create an account and save your thrills.'
    : 'Sign in to your account to access your thrills';
  const buttonText = signUp ? 'Sign Up' : 'Sign In';
  const buttonColor = signUp ? 'blue' : 'ochre';
  const endPrompt = signUp
    ? 'Already have an account?'
    : "Don't have an account?";

  const endPromptButtonText = signUp ? 'Sign In' : 'Sign Up';

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
          <hr className='divider'></hr>
          <Button variant='contained' color='secondary' startIcon={<Google />}>
            {buttonText} with Google
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
