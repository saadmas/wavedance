import { SignUpAction, SignUpState } from './types';

export const getInitialSignUpState = (): SignUpState => {
  return {
    name: '',
    birthday: '',
    currentLocation: '',
    hometown: '',
    profilePhoto: '',
    prompts: [],
    passions: new Set(),
    genres: new Set(),
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
    case 'HOMETOWN_UPDATE':
      const hometown = action.payload;
      return { ...state, hometown };
    case 'CURRENT_LOCATION_UPDATE':
      const currentLocation = action.payload;
      return { ...state, currentLocation };
    case 'OCCUPATION_UPDATE':
      const occupation = action.payload;
      return { ...state, occupation };
    case 'CURRENT_LOCATION_AS_HOMETOWN':
      return { ...state, currentLocation: state.hometown };
    case 'PASSIONS_UPDATE':
      const passions = action.payload;
      return { ...state, passions };
    case 'GENRES_UPDATE':
      const genres = action.payload;
      return { ...state, genres };
    default:
      return { ...state };
  }
};
