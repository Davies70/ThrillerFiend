import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PropTypes from 'prop-types';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuth, setUser] = useState(null);
  const [user, loading] = useAuthState(auth); // or any other hook for auth

  useEffect(() => {
    if (!loading) setUser(user);
  }, [user, loading]);

  return (
    <AuthContext.Provider value={userAuth}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
