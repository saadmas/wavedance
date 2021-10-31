export interface SignUpState {
  firstName: string;
  lastName: string;
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
  payload: { firstName: string; lastName: string };
}

export type SignUpAction = NameUpdateAction;
