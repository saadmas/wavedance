import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import PromptsManager from '../../../../components/PromptsManager/PromptsManager';
import { getEdmTrainCities, getEdmTrainStates } from '../../../../edmTrain/locations';
import { getEventMembersPath, getUserEventPromptsPath, getUserFavoriteEventsPath } from '../../../../firebase/utils';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { getPromptsToStore } from '../../../../utils/prompts/prompt.util';
import { EventStackParamList } from '../../EventStack';

export interface EventPromptsProps {
  eventId: number;
  filledPrompts?: Map<EventPrompt, string>;
}

type EventPromptScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventPrompts>;

const EventPromptScreen = ({ route, navigation }: EventPromptScreenProps) => {
  const { eventId, filledPrompts } = route.params;

  const saveEvent = async () => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getUserFavoriteEventsPath(uid, eventId);

    try {
      await firebase.database().ref(path).set(true);
    } catch (e) {
      console.error('saveEvent failed');
      console.error(e);
      console.error(`uid: ${uid}`);
    }
  };

  const saveUserUnderEventMembers = async () => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getEventMembersPath(eventId, uid);

    try {
      await firebase.database().ref(path).set(true);
    } catch (e) {
      console.error('saveUserUnderEventMembers failed');
      console.error(e);
      console.error(`eventId: ${eventId}`);
      console.error(`uid: ${uid}`);
    }
  };

  const saveUserEventPrompts = async () => {
    if (!filledPrompts) {
      return;
    }

    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getUserEventPromptsPath(uid, eventId);
    const promptsToStore = getPromptsToStore(PromptSelectionType.Event, filledPrompts);

    try {
      await firebase.database().ref(path).set(promptsToStore);
    } catch (e) {
      console.error('saveUserUnderEventMembers failed');
      console.error(e);
      console.error(`eventId: ${eventId}`);
      console.error(`uid: ${uid}`);
      console.error(`filledPrompts: ${promptsToStore}`);
    }
  };

  const onPromptsSubmit = async () => {
    await saveEvent();
    await saveUserUnderEventMembers();
    await saveUserEventPrompts();
    navigation.navigate(Path.EventCarousel, { eventId: eventId });
  };

  return <PromptsManager onSubmit={onPromptsSubmit} selectionType={PromptSelectionType.Event} />;
};

export default EventPromptScreen;
