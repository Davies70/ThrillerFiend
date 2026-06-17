import Nav from './Nav';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <Nav />
      <main id="content">{children}</main>
    </div>
  );
};

Layout.propTypes = { children: PropTypes.node };

export default Layout;
