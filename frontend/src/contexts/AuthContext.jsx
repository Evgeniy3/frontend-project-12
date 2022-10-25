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

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
