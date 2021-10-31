import React from 'react';

type UserToken = string | undefined | null;

const AuthStateContext = React.createContext<UserToken>(undefined);
const AuthUpdaterContext = React.createContext<React.Dispatch<React.SetStateAction<UserToken>> | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = React.useState<UserToken>(undefined);

  return (
    <AuthStateContext.Provider value={userToken}>
      <AuthUpdaterContext.Provider value={setUserToken}>{children}</AuthUpdaterContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const userToken = React.useContext(AuthStateContext);
  return userToken;
};

export const useAuthUpdater = () => {
  const setUserToken = React.useContext(AuthUpdaterContext);

  if (typeof setUserToken === 'undefined') {
    throw new Error('useAuthUpdater must be used within a AuthProvider');
  }

  return setUserToken;
};
