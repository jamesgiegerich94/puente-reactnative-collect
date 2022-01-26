import React, { createContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

import { deleteData, getData, storeData } from '../../../modules/async-storage';
import { populateCache } from '../../../modules/cached-resources';
import {
  retrieveCurrentUserAsyncFunction,
  retrieveSignInFunction,
  retrieveSignOutFunction,
} from './index';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    retrieveCurrentUserAsyncFunction().then((currentParseUser) => {
      if (currentParseUser) {
        const usr = currentParseUser;
        usr.isOnline = true;
        setUser(usr);
        storeData(usr, 'currentUser');
        setIsLoading(false);
      } else {
        getData('currentUser').then((currentAsyncUser) => {
          if (currentAsyncUser) {
            const usr = currentAsyncUser;
            usr.isOnline = false;
            setUser(usr);
          }
          setIsLoading(false);
        });
      }
    });
  }, []);

  const onlineLogin = async (enteredCredentials) => {
    const { username, password } = enteredCredentials;
    setIsLoading(true);
    return retrieveSignInFunction(username, password)
      .then((currentParseUser) => {
        const usr = currentParseUser;
        usr.isOnline = true;
        setUser(usr);
        storeData(usr, 'currentUser');
        storeData(password, 'password');
        populateCache(usr); // NEED TO DIG INTO THIS, DOES THIS MAKE THE APP SLOW?
        setIsLoading(false);
        return true;
      })
      .catch(async (e) => {
        await setError(e.toString());
        setIsLoading(false);
        return false;
      });
  };

  const offlineLogin = (enteredCredentials) => {
    const { username, password } = enteredCredentials;
    const { username: usr, password: pswd } = user; // cached user

    setIsLoading(true);

    if (username !== usr && password !== pswd) return false;

    setIsLoading(false);

    return true;
  };

  /**
   * NEED TO DO
   * @param {*} email
   * @param {*} password
   * @param {*} repeatedPassword
   * @returns
   */

  //   const onRegister = (email, password, repeatedPassword) => {
  //     setIsLoading(true);
  //     if (password !== repeatedPassword) {
  //       setError('Error: Passwords do not match');
  //       return;
  //     }
  //     retrieveSignUpFunction(params)
  //       .then((u) => {
  //         setUser(u);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         setIsLoading(false);
  //         setError(e.toString());
  //       });
  //   };

  const onLogout = async () => retrieveSignOutFunction()
    .then(() => {
      setUser(null);
      setError(null);
      deleteData('currentUser');
      return true;
    });

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onlineLogin,
        offlineLogin,
        // onRegister,
        onLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
