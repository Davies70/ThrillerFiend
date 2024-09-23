import { useState } from 'react';
import '../styles/SignIn.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { updateProfile } from 'firebase/auth';
import Loader from '../components/Loader';
import { createUser } from '../services/userServices';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, , loading] =
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
      <form className='signIn-Form' onSubmit={handleSignUp}>
        <h1>{header}</h1>
        <p className='signIn-prompt'>{prompt}</p>
        <div className='input-groups'>
          <div className='input-group'>
            <label htmlFor='email'>Username</label>
            <input
              type='text'
              placeholder='username'
              required
              autoComplete='off'
              value={userName}
              onChange={({ target }) => setUserName(target.value)}
            />
          </div>
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
            disabled={loading}
            type='submit'
          >
            {buttonText}
          </Button>
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
