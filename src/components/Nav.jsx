import React, { useState } from 'react';
import '../styles/Nav.css';
import Logo from './icons/nav/Logo';
import LogoSmall from './icons/nav/LogoSmall';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearchQuery = (event) => {
    event.preventDefault();
    setSearchQuery('');
  };

  const handleSearchQueryInput = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  return (
    <nav className='nav'>
      <ul className='nav-list'>
        <a id='logo'>
          <Logo />
        </a>
        <a id='logo-small'>
          <LogoSmall />
        </a>
        <a className='nav-link'>
          <span id='nav-icon home-icon'>
            <HomeIcon />
          </span>
          <span className='nav-text'> Home</span>
        </a>
        <a className='nav-link'>
          <span id='nav-icon'>
            <WhatshotIcon />
          </span>
          <span className='nav-text'>New Thrills</span>
        </a>
        <a className='nav-link'>
          <span id='nav-icon'>
            <LibraryBooksIcon />
          </span>
          <span className='nav-text home-icon'>Collections</span>
        </a>
        <button className='search-icon-small'>
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
    </nav>
  );
};

export default Nav;
