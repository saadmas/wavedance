import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import PromptsManager from '../../../../components/PromptsManager/PromptsManager';
import { EdmTrainEvent } from '../../../../edmTrain/types';
import { FavoriteEvent } from '../../../../firebase/types';
import { getEventMembersPath, getUserEventPromptsPath, getUserFavoriteEventsPath } from '../../../../firebase/utils';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { getPromptsToStore } from '../../../../utils/prompts/prompt.util';
import { EventStackParamList } from '../../EventStack';

export interface EventPromptsProps {
  event: EdmTrainEvent;
  filledPrompts?: Map<EventPrompt, string>;
}

type EventPromptScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventPrompts>;

const EventPromptScreen = ({ route, navigation }: EventPromptScreenProps) => {
  const { event, filledPrompts } = route.params;

  const saveEvent = async () => {
    const { id, createdDate } = event;
    const favoriteEvent: FavoriteEvent = { createdDate };

    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getUserFavoriteEventsPath(uid, id);

    try {
      await firebase.database().ref(path).set(favoriteEvent);
    } catch (e) {
      console.error('saveEvent failed');
      console.error(e);
      console.error(`uid: ${uid}`);
    }
  };

  const saveUserUnderEventMembers = async () => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getEventMembersPath(event.id, uid);

    try {
      await firebase.database().ref(path).set(true);
    } catch (e) {
      console.error('saveUserUnderEventMembers failed');
      console.error(e);
      console.error(`eventId ${event.id}`);
      console.error(`uid: ${uid}`);
    }
  };

  const saveUserEventPrompts = async () => {
    if (!filledPrompts) {
      return;
    }

    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getUserEventPromptsPath(uid, event.id);
    const promptsToStore = getPromptsToStore(PromptSelectionType.Event, filledPrompts);

    try {
      await firebase.database().ref(path).set(promptsToStore);
    } catch (e) {
      console.error('saveUserUnderEventMembers failed');
      console.error(e);
      console.error(`eventId ${event.id}`);
      console.error(`uid: ${uid}`);
      console.error(`filledPrompts: ${promptsToStore}`);
    }
  };

  const onPromptsSubmit = async () => {
    await saveEvent();
    await saveUserUnderEventMembers();
    await saveUserEventPrompts();
    navigation.navigate(Path.EventCarousel, { eventId: event.id });
  };

  return <PromptsManager onSubmit={onPromptsSubmit} selectionType={PromptSelectionType.Event} />;
};

export default EventPromptScreen;
