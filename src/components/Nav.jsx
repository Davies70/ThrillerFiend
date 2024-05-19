import React, { useState } from 'react';
import '../styles/Nav.css';
import Logo from './icons/nav/Logo';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';

import CancelIcon from '@mui/icons-material/Cancel';
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

  console.log('search value ', searchQuery);

  return (
    <nav className='nav'>
      <ul>
        <li id='logo'>
          <a>
            <Logo />
          </a>
        </li>
        <li>
          <a className='nav-link'>
            <span id='nav-icon'>
              <HomeIcon />
            </span>
            <span className='nav-text'> Home</span>
          </a>
        </li>
        <li>
          <a className='nav-link'>
            <span id='nav-icon'>
              <WhatshotIcon />
            </span>
            <span className='nav-text'>New Thrills</span>
          </a>
        </li>
        <li>
          <a className='nav-link'>
            <span id='nav-icon'>
              <LibraryBooksIcon />
            </span>
            <span className='nav-text'>Collections</span>
          </a>
        </li>
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
        <button className='sign-in'>
          <a>sign in</a>
        </button>
      </ul>
    </nav>
  );
};

export default Nav;
