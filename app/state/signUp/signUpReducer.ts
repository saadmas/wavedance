import { SignUpAction, SignUpState } from './types';

export const getInitialSignUpState = (): SignUpState => {
  return {
    firstName: '',
    lastName: '',
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
      const { firstName, lastName } = action.payload;
      return { ...state, firstName, lastName };
    default:
      return { ...state };
  }
};
