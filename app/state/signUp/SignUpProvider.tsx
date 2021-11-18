import React from 'react';
import { getInitialSignUpState, signUpReducer } from './signUpReducer';
import { SignUpAction, SignUpState } from './types';

const SignUpStateContext = React.createContext<SignUpState>(getInitialSignUpState());
const SignUpDispatchContext = React.createContext<React.Dispatch<SignUpAction> | undefined>(undefined);

export const SignUpProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(signUpReducer, getInitialSignUpState());
  return (
    <SignUpStateContext.Provider value={state}>
      <SignUpDispatchContext.Provider value={dispatch}>{children}</SignUpDispatchContext.Provider>
    </SignUpStateContext.Provider>
  );
};

export const useSignUpState = () => {
  const signUpState = React.useContext(SignUpStateContext);
  return signUpState;
};

export const useSignUpDispatch = () => {
  const signUpDispatch = React.useContext(SignUpDispatchContext);

  if (typeof signUpDispatch === 'undefined') {
    throw new Error('useSignUpUpdater must be used within a SignUpProvider');
  }

  return signUpDispatch;
};
