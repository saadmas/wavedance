import firebase from 'firebase';
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { EdmTrainEvent } from '../../edmTrain/types';
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
import { PromptAnswer } from '../PromptsManager/PromptsManager';
import UserProfile from './UserProfile/UserProfile';

interface UserProfileQueryProps {
  userId: string;
  event: EdmTrainEvent;
  isEditMode?: boolean;
  goToNextProfile: () => void;
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
  prompts: Map<Prompt, PromptAnswer>;
  eventPrompts?: Map<EventPrompt, PromptAnswer>;
  pronouns: string[];
  instagramHandle?: string;
  occupation?: string;
}

const getEmptyUserProfile = (): UserProfileType => ({
  id: '',
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

const UserProfileQuery = ({ userId, event, goToNextProfile }: UserProfileQueryProps) => {
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);
  const [userProfile, setUserProfile] = React.useState<UserProfileType>({
    ...getEmptyUserProfile(),
    id: userId,
  });

  React.useEffect(() => {
    setResponseStatus(ResponseStatus.Loading);

    setUserProfile({
      ...getEmptyUserProfile(),
      id: userId,
    });
  }, [userId]);

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
          const prompts = new Map(Object.entries(value)) as Map<Prompt, PromptAnswer>;
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
      if (event.id === undefined) {
        return;
      }

      try {
        const path = getUserEventPromptsPath(userId, event.id);
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();
        if (value) {
          const eventPrompts = new Map(Object.entries(value)) as Map<EventPrompt, PromptAnswer>;
          setUserProfile(prevProfile => ({ ...prevProfile, eventPrompts }));
        }
      } catch (e) {
        console.error('fetchPrompts failed');
        console.error(e);
        console.error(`userId: ${userId}`);
      }
    };

    setResponseStatus(ResponseStatus.Loading);
    fetchPhotoUri();
    fetchBasicInfo();
    fetchAdditionalInfo();
    fetchPrompts();
    fetchEventPrompts();
  }, [userId]);

  if (responseStatus === ResponseStatus.Loading) {
    return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  return;
  <Animatable.View ref={viewRef} easing="ease-in-out-circ">
    <UserProfile userProfile={userProfile} goToNextProfile={goToNextProfile} event={event} />;
  </Animatable.View>;
};

export default UserProfileQuery;
