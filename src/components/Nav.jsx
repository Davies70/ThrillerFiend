import { useState, useRef, useEffect } from 'react';
import '../styles/Nav.css';
import Logo from './icons/nav/Logo';
import LogoSmall from './icons/nav/LogoSmall';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import Suggestions from './Suggestions';
import bookServices from '../services/bookServices';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthButton from './AuthButton';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const inputRef = useRef(null);
  const location = useLocation();

  const handleSearchIconClick = (event) => {
    event.preventDefault();
    setShowSearchContainer(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleBlur = (event) => {
    event.preventDefault();
    setTimeout(() => {
      if (!inputRef.current.contains(event.relatedTarget)) {
        setShowSearchContainer(false);
        setSuggestions([]);
      }
    }, 200);
  };

  const clearSearchQuery = (event) => {
    event.preventDefault();
    setSearchQuery('');
    setSuggestions([]);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const fetchSuggestions = async (q) => {
    try {
      const data = await bookServices.getBooksSuggestions(q);
      if (data && data.length > 0) {
        return data;
      } else {
        return [{ title: 'No results found', authors: 'Try another search' }];
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearchQuery = (event) => {
    event.preventDefault();
    if (searchQuery) {
      setShowSuggestions(true);
      setTriggerSearch(true);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => fetchSuggestions(searchQuery),
    enabled: triggerSearch,
  });

  useEffect(() => {
    if (data) {
      setSuggestions(data);
      setTriggerSearch(false);
    }
  }, [data]);

  const closeSugesstions = () => {
    setShowSuggestions(false);
  };

  const navigate = useNavigate();

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
        navigate('/signin');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  const { user, loading } = useAuth();

  const dontShowSignInButton =
    location.pathname === '/signin' || location.pathname === '/signup';

  const searchContainer = () => {
    return (
      <div className='show-search-container'>
        <form
          className='search-form-mini'
          autoComplete='off'
          ref={inputRef}
          onSubmit={handleSearchQuery}
        >
          <input
            className='search-bar-mini'
            aria-label='Search'
            type='search'
            id='search'
            value={searchQuery}
            placeholder='Search Books...'
            onChange={({ target }) => setSearchQuery(target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearchQuery(event);
              }
            }}
          />
          {searchQuery ? (
            <button
              className='cancel-search-mini'
              onClick={clearSearchQuery}
              tabIndex='-1'
            >
              <CancelIcon />
            </button>
          ) : null}
          <button className='search-icon-button-mini' onClick={handleBlur}>
            cancel
          </button>
        </form>
        {showSuggestions && (
          <Suggestions
            onSuggestionClick={() => {
              setShowSearchContainer(false);
            }}
            suggestions={suggestions}
            isError={isError}
            isLoading={isLoading}
            closeSuggestions={closeSugesstions}
          />
        )}
      </div>
    );
  };

  return (
    <nav className='nav'>
      {showSearchContainer ? (
        searchContainer()
      ) : (
        <ul className='nav-list'>
          <Link to={'/'} id='logo'>
            <Logo />
          </Link>

          <Link to={'/'} id='logo-small'>
            <LogoSmall />
          </Link>

          <Link
            className={
              location.pathname === '/' ? 'nav-link-active' : 'nav-link'
            }
            id='home-icon'
            to={'/'}
          >
            <span id='nav-icon '>
              <HomeIcon />
            </span>
            <span className='nav-text'> Home</span>
          </Link>
          <Link
            className={
              location.pathname === '/new' ? 'nav-link-active' : 'nav-link'
            }
            to={'/new'}
          >
            <span id='nav-icon'>
              <WhatshotIcon />
            </span>
            <span className='nav-text'>Hot Thrills</span>
          </Link>
          <Link
            className={
              location.pathname === '/collections'
                ? 'nav-link-active'
                : 'nav-link'
            }
            to={user ? '/collections' : '/signin'}
          >
            <span id='nav-icon'>
              <LibraryBooksIcon />
            </span>
            <span className='nav-text home-icon'>Collections</span>
          </Link>
          <button className='search-icon-small' onClick={handleSearchIconClick}>
            <SearchIcon />
          </button>

          <div className='search-container'>
            <form className='search-form' onSubmit={handleSearchQuery}>
              <input
                className='search-bar'
                aria-label='Search'
                type='search'
                id='search'
                placeholder='Search Books...'
                value={searchQuery}
                ref={inputRef}
                onChange={({ target }) => setSearchQuery(target.value)}
              />
              <button className='search-icon-button' type='submit'>
                <SearchIcon />
              </button>

              {searchQuery ? (
                <button className='cancel-search' onClick={clearSearchQuery}>
                  <CancelIcon />
                </button>
              ) : null}
            </form>

            {showSuggestions && (
              <Suggestions
                suggestions={suggestions}
                isError={isError}
                isLoading={isLoading}
                onSuggestionClick={() => {
                  setShowSearchContainer(false);
                }}
                closeSuggestions={closeSugesstions}
              />
            )}
          </div>
          <AuthButton
            loading={loading}
            user={user}
            handleSignOut={handleSignOut}
            dontShowSignInButton={dontShowSignInButton}
          />
          <li
            className={
              location.pathname === '/signin'
                ? 'nav-link-active profile-icon-wrapper'
                : 'nav-link profile-icon-wrapper'
            }
          >
            {loading ? (
              <LoadingButton
                loading
                variant='contained'
                sx={{
                  borderRadius: '1.5rem',
                  minWidth: '40px', // Ensure consistent width
                  width: '40px',
                  height: '40px',
                }}
                size='small'
              />
            ) : user ? (
              <button onClick={handleSignOut} className='profile-button'>
                <LogoutIcon color='ochre' />
              </button>
            ) : (
              <Link to={'/signin'} className='profile-link'>
                <AccountCircleIcon />
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
