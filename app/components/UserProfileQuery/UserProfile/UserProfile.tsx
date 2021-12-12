import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Prompt } from '../../../state/enums/prompt';
import { getFullTextFromPromptKey } from '../../../utils/prompts/prompt.util';
import { UserProfileType } from '../UserProfileQuery';
import UserProfileHeader from './UserProfileHeader/UserProfileHeader';
import UserProfileImage from './UserProfileImage/UserProfileImage';
import UserProfilePrompt from './UserProfilePrompt/UserProfilePrompt';

interface UserProfileProps {
  userProfile: UserProfileType;
}

const UserProfile = ({ userProfile }: UserProfileProps) => {
  const { photoUri, name, pronouns, prompts } = userProfile;

  const renderFirstEventPrompt = () => {
    /// use event prompts!
    if (!prompts?.size) {
      return;
    }

    const firstEventPrompt = [...prompts.entries()][0];
    const promptQuestion = getFullTextFromPromptKey(firstEventPrompt[0]);
    const promptAnswer = firstEventPrompt[1];

    return <UserProfilePrompt promptQuestion={promptQuestion} promptAnswer={promptAnswer} />;
  };

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 10 }} contentInset={{ bottom: 100 }}>
      <UserProfileHeader name={name} pronouns={pronouns} />
      <UserProfileImage userPhotoUri={photoUri} />
      {renderFirstEventPrompt()}
    </ScrollView>
  );
};

export default UserProfile;
