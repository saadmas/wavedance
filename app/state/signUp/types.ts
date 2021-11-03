export interface SignUpState {
  name: string;
  birthday: string;
  currentLocation: string;
  hometown: string;
  passions: string[];
  profilePhoto: string;
  instagramHandle?: string;
  prompts: string[];
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

interface CurrentLocationAsHometownAction {
  type: 'CURRENT_LOCATION_AS_HOMETOWN';
}

export type SignUpAction =
  | NameUpdateAction
  | BirthdayUpdateAction
  | HometownUpdateAction
  | CurrentLocationUpdateAction
  | CurrentLocationAsHometownAction;
