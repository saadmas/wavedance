import { Prompt } from 'expo-auth-session';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { EventPrompt } from '../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../state/enums/promptSelectionType';
import { getFullTextFromPromptKey } from '../../../utils/prompts/prompt.util';
import { PromptAnswer } from '../../PromptsManager/PromptsManager';
import { UserProfileType } from '../UserProfileQuery';
import UserBio from './UserBio/UserBio';
import UserPassions from './UserPassions/UserPassions';
import UserProfileHeader from './UserProfileHeader/UserProfileHeader';
import UserProfileImage from './UserProfileImage/UserProfileImage';
import UserProfilePrompt from './UserProfilePrompt/UserProfilePrompt';

interface UserProfileProps {
  userProfile: UserProfileType;
}

type PromptEntry = [EventPrompt | Prompt, PromptAnswer];

const UserProfile = ({ userProfile }: UserProfileProps) => {
  const {
    photoUri,
    name,
    pronouns,
    eventPrompts,
    birthday,
    currentLocation,
    hometown,
    instagramHandle,
    occupation,
    passions,
  } = userProfile;

  const renderPrompts = (promptList: PromptEntry[]) => {
    if (!promptList?.length) {
      return;
    }

    const displayPrompts = promptList.map(p => {
      const promptQuestion = getFullTextFromPromptKey(p[0], PromptSelectionType.Event);
      const promptAnswer = p[1];
      return <UserProfilePrompt promptQuestion={promptQuestion} promptAnswer={promptAnswer} key={promptQuestion} />;
    });

    return displayPrompts;
  };

  const renderFirstEventPrompt = () => {
    if (!eventPrompts?.size) {
      return;
    }
    const firstEventPrompt = [...eventPrompts.entries()][0];
    return renderPrompts([firstEventPrompt]);
  };

  const renderEventPrompts = () => {
    if (!eventPrompts || eventPrompts.size <= 1) {
      return;
    }
    const eventPromptsToDisplay = [...eventPrompts.entries()].slice(1);
    return renderPrompts(eventPromptsToDisplay);
  };

  return (
    <ScrollView contentInset={{ bottom: 100 }}>
      <UserProfileHeader name={name} pronouns={pronouns} />
      <UserProfileImage userPhotoUri={photoUri} />
      {renderFirstEventPrompt()}
      <UserBio
        birthday={birthday}
        currentLocation={currentLocation}
        hometown={hometown}
        instagramHandle={instagramHandle}
        occupation={occupation}
      />
      {renderEventPrompts()}
      <UserPassions passions={passions} />
    </ScrollView>
  );
};

export default UserProfile;
