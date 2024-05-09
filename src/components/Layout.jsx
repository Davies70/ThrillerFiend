import React from 'react';
import Nav from './Nav';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

Layout.propTypes = { children: PropTypes.node };

export default Layout;
