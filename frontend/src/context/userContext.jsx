import React, { createContext, useEffect, useState } from 'react';
import { login as loginApi, register as registerApi, authMe } from '../api';
import { setAccessToken, getAccessToken } from '../utils/accessToken';
import { setRefreshToken, getRefreshToken } from '../utils/refreshToken';
import { setItem } from '../utils/localstorage';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const navigate = useNavigate();

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  const login = (newUserData) => {
    loginApi(newUserData).then((res) => {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      updateUser(res.user);
      setAuthenticated(true);
      navigate('/aquarium');
    }).catch(() => {
      alert('Invalid credentials');
    });
  };

  const register = (newUserData) => {
    registerApi(newUserData).then((res) => {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      updateUser(res.user);
      setAuthenticated(true);
      navigate('/aquarium');
    });
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setItem('user', null);
    updateUser(null);
    navigate('/');
  }
;
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    if ((accessToken && refreshToken) && !authenticated) {
        authMe().then((res) => {
        updateUser(res)
        setAuthenticated(true)
        navigate('/aquarium')
      }).catch(() => {
        logout()
      })
    }
  }, [authenticated, accessToken, refreshToken])

  return (
    <UserContext.Provider value={{ user, updateUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
