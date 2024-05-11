import React, { useState } from 'react';
import '../styles/Nav.css';
import Logo from './icons/nav/Logo';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';

const Nav = () => {
  // const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  // const handleOpen = () => {};

  // const handleBlur = () => {};
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
            />
            {/* <button className='search-icon-button'>
              <SearchIcon style={{ color: '#0000004d' }} />
            </button> */}
          </form>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
