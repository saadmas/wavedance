import { Prompt } from 'expo-auth-session';
import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EdmTrainEvent } from '../../../edmTrain/types';
import { EventPrompt } from '../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../state/enums/promptSelectionType';
import { getFullTextFromPromptKey } from '../../../utils/prompts/prompt.util';
import IgnoreButton from '../../IgnoreButton/IgnoreButton';
import { PromptAnswer } from '../../PromptsManager/PromptsManager';
import ReportDialog from '../../ReportDialog/ReportDialog';
import WaveButton from '../../WaveButton/WaveButton';
import { UserProfileType } from '../UserProfileQuery';
import UserBio from './UserBio/UserBio';
import UserBioPills from './UserBioPills/UserBioPills';
import UserProfileHeader from './UserProfileHeader/UserProfileHeader';
import UserProfileImage from './UserProfileImage/UserProfileImage';
import UserProfilePrompt from './UserProfilePrompt/UserProfilePrompt';

interface UserProfileProps {
  userProfile: UserProfileType;
  onProfileViewComplete: () => void;
  event: EdmTrainEvent;
  isWaveMode?: boolean;
}

type PromptEntry = [Prompt | EventPrompt, PromptAnswer];

const UserProfile = ({ userProfile, onProfileViewComplete, event, isWaveMode }: UserProfileProps) => {
  const {
    id,
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
    prompts,
    genres,
  } = userProfile;

  const renderPrompts = (promptList: PromptEntry[], promptSelectionType: PromptSelectionType) => {
    if (!promptList?.length) {
      return;
    }

    const displayPrompts = promptList.map(p => {
      const promptQuestion = getFullTextFromPromptKey(p[0], promptSelectionType);
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
    return renderPrompts([firstEventPrompt], PromptSelectionType.Event);
  };

  const renderEventPrompts = () => {
    if (!eventPrompts || eventPrompts.size <= 1) {
      return;
    }
    const eventPromptsToDisplay = [...eventPrompts.entries()].slice(1);
    return renderPrompts(eventPromptsToDisplay, PromptSelectionType.Event);
  };

  const renderFirstUserPrompt = () => {
    const firstPrompt = [...prompts.entries()][0];
    return renderPrompts([firstPrompt], PromptSelectionType.General);
  };

  const renderUserPrompts = () => {
    if (prompts.size <= 1) {
      return;
    }
    const userPromptsToDisplay = [...prompts.entries()].slice(1);
    return renderPrompts(userPromptsToDisplay, PromptSelectionType.General);
  };

  const onWaveOrIgnore = async () => {
    await new Promise(r => setTimeout(r, 700)); // To let the wave/ignore animations play out nicely :)
    onProfileViewComplete();
  };

  return (
    <>
      <View>
        <ScrollView contentInset={{ bottom: 100 }} showsVerticalScrollIndicator={false}>
          <UserProfileHeader name={name} pronouns={pronouns} />
          <UserProfileImage photoUri={photoUri} />
          {renderFirstEventPrompt()}
          <UserBio
            birthday={birthday}
            currentLocation={currentLocation}
            hometown={hometown}
            instagramHandle={instagramHandle}
            occupation={occupation}
          />
          {renderEventPrompts()}
          <UserBioPills pillTexts={passions} titleText="My Passions" />
          {renderFirstUserPrompt()}
          <UserBioPills pillTexts={genres} titleText="My Favorite Genres" />
          {renderUserPrompts()}
          <ReportDialog reportedOnId={id} eventId={event.id} onReportComplete={onWaveOrIgnore} />
        </ScrollView>
      </View>
      <WaveButton onWave={onWaveOrIgnore} event={event} waveReceivedByUid={id} name={name} />
      <IgnoreButton onIgnore={onWaveOrIgnore} eventId={event.id} userToIgnoreId={id} isWaveMode={isWaveMode} />
    </>
  );
};

export default UserProfile;
