export interface SignUpState {
  name: string;
  birthday: string;
  currentLocation: string;
  hometown: string;
  passions: Set<string>;
  genres: Set<string>;
  profilePhotoUri: string;
  prompts: Map<Prompt, string>;
  occupation?: string;
  instagramHandle?: string;
}

interface NameUpdateAction {
  type: 'NAME_UPDATE';
  payload: string;
}

interface BirthdayUpdateAction {
  type: 'BIRTHDAY_UPDATE';
  payload: string;
}

interface HometownUpdateAction {
  type: 'HOMETOWN_UPDATE';
  payload: string;
}

interface CurrentLocationUpdateAction {
  type: 'CURRENT_LOCATION_UPDATE';
  payload: string;
}

interface OccupationUpdateAction {
  type: 'OCCUPATION_UPDATE';
  payload: string;
}

interface CurrentLocationAsHometownAction {
  type: 'CURRENT_LOCATION_AS_HOMETOWN';
}

interface GenresUpdateAction {
  type: 'GENRES_UPDATE';
  payload: Set<string>;
}

interface PassionsUpdateAction {
  type: 'PASSIONS_UPDATE';
  payload: Set<string>;
}

interface ProfilePhotoUpdateAction {
  type: 'PROFILE_PHOTO_UPDATE';
  payload: string;
}

interface AddPromptAction {
  type: 'ADD_PROMPT';
  payload: { prompt: Prompt; value: string };
}

interface RemovePromptAction {
  type: 'REMOVE_PROMPT';
  payload: Prompt;
}

export type SignUpAction =
  | NameUpdateAction
  | BirthdayUpdateAction
  | HometownUpdateAction
  | CurrentLocationUpdateAction
  | CurrentLocationAsHometownAction
  | OccupationUpdateAction
  | GenresUpdateAction
  | PassionsUpdateAction
  | ProfilePhotoUpdateAction
  | AddPromptAction
  | RemovePromptAction;
