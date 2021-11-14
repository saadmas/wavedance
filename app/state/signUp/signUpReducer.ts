import { SignUpAction, SignUpState } from './types';

export const getInitialSignUpState = (): SignUpState => {
  return {
    name: 'Saad',
    birthday: '1-11-2000', ///
    currentLocation: '',
    hometown: '',
    profilePhotoUri: '',
    prompts: new Map(),
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
    case 'INSTAGRAM_HANDLE_UPDATE':
      const instagramHandle = action.payload;
      return { ...state, instagramHandle };
    case 'CURRENT_LOCATION_AS_HOMETOWN':
      return { ...state, currentLocation: state.hometown };
    case 'PASSIONS_UPDATE':
      const passions = action.payload;
      return { ...state, passions };
    case 'GENRES_UPDATE':
      const genres = action.payload;
      return { ...state, genres };
    case 'PROFILE_PHOTO_UPDATE':
      const profilePhotoUri = action.payload;
      return { ...state, profilePhotoUri };
    case 'PROMPT_UPDATE':
      console.log(action.payload);
      return { ...state, prompts: new Map(action.payload) };
    default:
      return { ...state };
  }
};
