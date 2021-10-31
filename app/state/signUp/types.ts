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

export type SignUpAction = NameUpdateAction;
