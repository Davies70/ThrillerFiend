import React from 'react';
import Nav from './Nav';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div
      className='container'
      style={{
        position: 'relative',
      }}
    >
      <Nav />
      <div id='content'>{children}</div>
    </div>
  );
};

Layout.propTypes = { children: PropTypes.node };

export default Layout;
