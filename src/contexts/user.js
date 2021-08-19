import React, { createContext, useContext, useEffect, useState } from 'react';

const loadState = (item) => {
  try {
    const serializedState = localStorage.getItem(item);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (token, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(token, serializedState);
  } catch (error) {
    // Ignore write errors;
  }
};

const removeState = (token) => {
  localStorage.removeItem(token);
}

const UserContext = createContext();

const USER_TOKEN = '@ecommerce-ejcomp/user';

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => loadState(USER_TOKEN));

  function removeUser() {
    removeState(USER_TOKEN);
  }

  useEffect(() => {
    saveState(USER_TOKEN, user);
  }, [user]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      removeUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}