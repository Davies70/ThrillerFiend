import React, { useState, useRef } from 'react';
import '../styles/Nav.css';
import Logo from './icons/nav/Logo';
import LogoSmall from './icons/nav/LogoSmall';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import Suggestions from './Suggestions';
import bookServices from '../services/bookServices';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchContainer, setShowSearchContainer] = useState(false);
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
    console.log({ showSearchContainer });
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const fetchSuggestions = async (q) => {
    try {
      setSuggestions([]);

      const data = await bookServices.getBooksSuggestions(q);
      if (data.length > 0) {
        setSuggestions(data);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions(['Error fetching suggestions']);
    }
  };

  const handleSearchQuery = (event) => {
    event.preventDefault();
    if (searchQuery) {
      fetchSuggestions(searchQuery);
    }
  };

  const searchContainer = () => {
    return (
      <div className='show-search-container'>
        <form className='search-form-mini' autoComplete='off' ref={inputRef}>
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
        {
          <Suggestions
            suggestions={suggestions}
            onSuggestionClick={() => {
              setShowSearchContainer(false);
              setSuggestions([]);
            }}
          />
        }
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
            <span className='nav-text'>Free Thrills</span>
          </Link>
          <Link
            className={
              location.pathname === '/collections'
                ? 'nav-link-active'
                : 'nav-link'
            }
            to={'/collections'}
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
            <form className='search-form'>
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
              <button
                className='search-icon-button'
                onClick={handleSearchQuery}
              >
                <SearchIcon />
              </button>

              {searchQuery ? (
                <button className='cancel-search' onClick={clearSearchQuery}>
                  <CancelIcon />
                </button>
              ) : null}
            </form>
            {suggestions.length > 0 ? (
              <Suggestions
                suggestions={suggestions}
                onSuggestionClick={() => {
                  setShowSearchContainer(false);
                  setSuggestions([]);
                }}
              />
            ) : null}
          </div>
          <li className='sign-in-wrapper'>
            <button className='sign-in'>
              <span>sign in</span>
            </button>
          </li>
          <button className='profile'>
            <Link to={'/signin'}>
              <AccountCircleIcon />
            </Link>
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
