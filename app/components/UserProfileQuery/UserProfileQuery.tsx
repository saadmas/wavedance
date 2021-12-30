import firebase from 'firebase';
import * as React from 'react';
import { getUserAdditionalInfoPath, getUserEventPromptsPath, getUserPromptsPath } from '../../firebase/utils';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { Prompt } from '../../state/enums/prompt';
import { ResponseStatus } from '../../state/enums/responseStatus';
import { PromptAnswer } from '../PromptsManager/PromptsManager';
import UserProfile from './UserProfile/UserProfile';
import * as Animatable from 'react-native-animatable';
import { getPhotoUri, getUserBasicInfo } from '../../firebase/queries';
import { WaveEvent } from '../../firebase/types';

interface UserProfileQueryProps {
  userId: string;
  event: WaveEvent;
  isEditMode?: boolean;
  isWaveMode?: boolean;
  onProfileViewComplete: () => void;
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

const UserProfileQuery = ({ userId, event, onProfileViewComplete, isWaveMode }: UserProfileQueryProps) => {
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
      const photoUri = await getPhotoUri(userId);
      if (photoUri) {
        setUserProfile(prevProfile => ({ ...prevProfile, photoUri }));
      }
    };

    const fetchBasicInfo = async () => {
      const basicInfo = await getUserBasicInfo(userId);
      if (basicInfo) {
        setUserProfile(prevProfile => ({ ...prevProfile, ...basicInfo }));
      }
    };

    const fetchAdditionalInfo = async () => {
      try {
        const path = getUserAdditionalInfoPath(userId);
        const snapshot = await firebase.database().ref(path).once('value');
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
        const snapshot = await firebase.database().ref(path).once('value');
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
        const snapshot = await firebase.database().ref(path).once('value');
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
    return null;
    //* return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  return (
    <Animatable.View animation="fadeInUpBig">
      <UserProfile
        userProfile={userProfile}
        onProfileViewComplete={onProfileViewComplete}
        event={event}
        isWaveMode={isWaveMode}
      />
    </Animatable.View>
  );
};

export default UserProfileQuery;
