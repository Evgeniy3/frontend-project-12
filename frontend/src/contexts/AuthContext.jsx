import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

// eslint-disable-next-line import/prefer-default-export
export const AuthProvider = ({ children }) => {
  const userLog = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(userLog ? { username: userLog.username } : null);
  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const getAuthToken = () => {
    const currentUser = userLog;
    if (currentUser && currentUser.token) {
      return { Authorization: `Basic ${currentUser.token}` };
    }
    return {};
  };

  const getUserName = () => {
    if (userLog) {
      return userLog.username;
    }
    return null;
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getAuthToken, getUserName, userLog,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
