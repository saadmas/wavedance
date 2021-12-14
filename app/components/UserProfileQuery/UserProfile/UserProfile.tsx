import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PromptSelectionType } from '../../../state/enums/promptSelectionType';
import { getFullTextFromPromptKey } from '../../../utils/prompts/prompt.util';
import { UserProfileType } from '../UserProfileQuery';
import UserProfileHeader from './UserProfileHeader/UserProfileHeader';
import UserProfileImage from './UserProfileImage/UserProfileImage';
import UserProfilePrompt from './UserProfilePrompt/UserProfilePrompt';

interface UserProfileProps {
  userProfile: UserProfileType;
}

const UserProfile = ({ userProfile }: UserProfileProps) => {
  const { photoUri, name, pronouns, eventPrompts } = userProfile;

  const renderFirstEventPrompt = () => {
    if (!eventPrompts?.size) {
      return;
    }

    const firstEventPrompt = [...eventPrompts.entries()][0];
    const promptQuestion = getFullTextFromPromptKey(firstEventPrompt[0], PromptSelectionType.Event);
    const promptAnswer = firstEventPrompt[1];

    return <UserProfilePrompt promptQuestion={promptQuestion} promptAnswer={promptAnswer} />;
  };

  return (
    <ScrollView contentInset={{ bottom: 100 }}>
      <UserProfileHeader name={name} pronouns={pronouns} />
      <UserProfileImage userPhotoUri={photoUri} />
      {renderFirstEventPrompt()}
    </ScrollView>
  );
};

export default UserProfile;
