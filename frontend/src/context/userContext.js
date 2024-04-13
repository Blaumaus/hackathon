import React, { createContext, useEffect, useState } from 'react';
import { login, register, authMe } from '../api';
import { setAccessToken, getAccessToken } from '../utils/accessToken';
import { setRefreshToken, getRefreshToken } from '../utils/refreshToken';
import { setItem } from '../utils/localstorage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  const login = (newUserData) => {
    login(newUserData).then((res) => {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      updateUser(res.user);
      setAuthenticated(true);
    });
  };

  const register = (newUserData) => {
    register(newUserData).then((res) => {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      updateUser(res.user);
      setAuthenticated(true);
    });
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setItem('user', null);
    updateUser(null);
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    (async () => {
      if ((accessToken && refreshToken) && !authenticated) {
        try {
          const me = await authMe()
          updateUser(me)
        } catch (e) {
          logout()
        }
      }
    })
  }, [authenticated]);

  return (
    <UserContext.Provider value={{ user, updateUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
