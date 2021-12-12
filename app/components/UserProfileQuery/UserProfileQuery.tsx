import firebase from 'firebase';
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import {
  getUserAdditionalInfoPath,
  getUserBasicInfoPath,
  getUserEventPromptsPath,
  getUserPhotosPath,
  getUserPromptsPath,
} from '../../firebase/utils';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { Prompt } from '../../state/enums/prompt';
import { ResponseStatus } from '../../state/enums/responseStatus';
import UserProfile from './UserProfile/UserProfile';

interface UserProfileQueryProps {
  userId: string;
  eventId?: number;
  isEditMode?: boolean;
  onWave?: () => void;
  onIgnore?: () => void;
}

export interface UserProfileType {
  id: string;
  name: string;
  birthday: string;
  photoUri: string;
  hometown: string;
  currentLocation: string;
  passions: string[];
  genres: string[];
  prompts: Map<Prompt, string>;
  eventPrompts?: Map<EventPrompt, string>;
  pronouns: string[];
  instagramHandle?: string;
  occupation?: string;
}

const UserProfileQuery = ({ userId, eventId }: UserProfileQueryProps) => {
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);
  const [userProfile, setUserProfile] = React.useState<UserProfileType>({
    id: userId,
    name: '',
    birthday: '',
    hometown: '',
    currentLocation: '',
    photoUri: '',
    passions: [],
    pronouns: [],
    genres: [],
    prompts: new Map(),
  });

  React.useEffect(() => {
    const fetchPhotoUri = async () => {
      try {
        const path = getUserPhotosPath(userId);
        const photoUri = await firebase.storage().ref(`${path}.jpg`).getDownloadURL();
        if (photoUri) {
          setUserProfile(prevProfile => ({ ...prevProfile, photoUri }));
        }
      } catch (e) {
        console.error('fetchPhotoUri failed');
        console.error(e);
        console.error(`userId: ${userId}`);
      }
    };

    const fetchBasicInfo = async () => {
      try {
        const path = getUserBasicInfoPath(userId);
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();
        if (value) {
          setUserProfile(prevProfile => ({ ...prevProfile, ...value }));
        }
      } catch (e) {
        console.error('fetchBasicInfo failed');
        console.error(e);
        console.error(`userId: ${userId}`);
      }
    };

    const fetchAdditionalInfo = async () => {
      try {
        const path = getUserAdditionalInfoPath(userId);
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();
        if (value) {
          setUserProfile(prevProfile => ({ ...prevProfile, ...value }));
        }
      } catch (e) {
        console.error('fetchAdditionalInfo failed');
        console.error(e);
        console.error(`userId: ${userId}`);
      }
    };

    const fetchPrompts = async () => {
      try {
        const path = getUserPromptsPath(userId);
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();
        if (value) {
          const prompts = new Map(Object.entries(value)) as Map<Prompt, string>;
          setUserProfile(prevProfile => ({ ...prevProfile, prompts }));
        }
        setResponseStatus(ResponseStatus.Success);
      } catch (e) {
        console.error('fetchPrompts failed');
        console.error(e);
        console.error(`userId: ${userId}`);
      }
    };

    const fetchEventPrompts = async () => {
      if (eventId === undefined) {
        return;
      }

      try {
        const path = getUserEventPromptsPath(userId, eventId);
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();
        if (value) {
          const eventPrompts = new Map(Object.entries(value)) as Map<EventPrompt, string>;
          setUserProfile(prevProfile => ({ ...prevProfile, eventPrompts }));
        }
      } catch (e) {
        console.error('fetchPrompts failed');
        console.error(e);
        console.error(`userId: ${userId}`);
      }
    };

    fetchPhotoUri();
    fetchBasicInfo();
    fetchAdditionalInfo();
    fetchPrompts();
    fetchEventPrompts();
  }, []);

  if (responseStatus === ResponseStatus.Loading) {
    return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  return <UserProfile userProfile={userProfile} />;
};

export default UserProfileQuery;
