import React from 'react';
import '../styles/Nav.css';
import Logo from './icons/nav/Logo';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Nav = () => {
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
            <span> Home</span>
          </a>
        </li>
        <li>
          <a className='nav-link'>
            <span id='nav-icon'>
              <WhatshotIcon />
            </span>
            <span>New Thrills</span>
          </a>
        </li>
        <li>
          <a className='nav-link'>
            <span id='nav-icon'>
              <LibraryBooksIcon />
            </span>
            <span>Collections</span>
          </a>
        </li>

        <div className='search'>
          <input className='search-bar' />
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
