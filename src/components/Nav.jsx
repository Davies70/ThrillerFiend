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

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchContainer, setShowSearchContainer] = useState(false);

  const inputRef = useRef(null);
  const location = useLocation();

  const clearSearchQuery = (event) => {
    event.preventDefault();
    setSearchQuery('');
    setShowSearchContainer(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleSearchQueryInput = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = (event) => {
    event.preventDefault();
    setShowSearchContainer(true);
    console.log(showSearchContainer);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleBlur = (event) => {
    event.preventDefault();
    if (!inputRef.current.contains(event.relatedTarget)) {
      setShowSearchContainer(false);
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
            placeholder='Search'
            onBlur={handleBlur}
            onChange={handleSearchQueryInput}
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
            <span className='nav-text'>New Thrills</span>
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
                placeholder='Search'
                value={searchQuery}
                onChange={handleSearchQueryInput}
                ref={inputRef}
              />
              <button
                className='search-icon-button'
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                <SearchIcon />
              </button>

              {searchQuery ? (
                <button className='cancel-search' onClick={clearSearchQuery}>
                  <CancelIcon />
                </button>
              ) : null}
            </form>
          </div>
          <li className='sign-in-wrapper'>
            <button className='sign-in'>
              <span>sign in</span>
            </button>
          </li>
          <button className='profile'>
            <AccountCircleIcon />
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
