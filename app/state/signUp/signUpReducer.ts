import { SignUpAction, SignUpState } from './types';

export const getInitialSignUpState = (): SignUpState => {
  return {
    name: '',
    birthday: '',
    currentLocation: '',
    hometown: '',
    passions: [],
    profilePhoto: '',
    prompts: [],
  };
};

export const signUpReducer = (state: SignUpState, action: SignUpAction): SignUpState => {
  switch (action.type) {
    case 'NAME_UPDATE':
      const name = action.payload;
      return { ...state, name };
    case 'BIRTHDAY_UPDATE':
      const birthday = action.payload;
      return { ...state, birthday };
    default:
      return { ...state };
  }
};
