import React from 'react';
import Nav from './Nav';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div id='content'>{children}</div>
    </>
  );
};

Layout.propTypes = { children: PropTypes.node };

export default Layout;
