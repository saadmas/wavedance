import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import PromptsManager from '../../../../components/PromptsManager/PromptsManager';
import { getEdmTrainCities, getEdmTrainStates } from '../../../../edmTrain/locations';
import { FavoriteEvent } from '../../../../firebase/types';
import { getEventMembersPath, getUserEventPromptsPath, getUserFavoriteEventsPath } from '../../../../firebase/utils';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { getPromptsToStore } from '../../../../utils/prompts/prompt.util';
import { EventStackParamList } from '../../EventStack';

export interface EventPromptsProps {
  favoriteEvent: FavoriteEvent;
  filledPrompts?: Map<EventPrompt, string>;
}

type EventPromptScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventPrompts>;

const EventPromptScreen = ({ route, navigation }: EventPromptScreenProps) => {
  const { favoriteEvent, filledPrompts } = route.params;

  const saveEvent = async (locationId: number) => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getUserFavoriteEventsPath(uid, locationId);

    try {
      await firebase.database().ref(path).push(favoriteEvent);
    } catch (e) {
      console.error('saveEvent failed');
      console.error(e);
      console.error(`locationId: ${locationId}`);
      console.error(`uid: ${uid}`);
    }
  };

  const saveCityUnderStateEvents = async () => {
    const city = getEdmTrainCities().get(favoriteEvent.locationId);
    if (!city) {
      return;
    }

    const state = [...getEdmTrainStates()].find(state => state[1].stateCode === city.stateCode);
    if (!state) {
      return;
    }

    const stateId = state[0];
    await saveEvent(stateId);
  };

  const saveUserUnderEventMembers = async () => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getEventMembersPath(favoriteEvent.id);

    try {
      await firebase.database().ref(path).push(uid);
    } catch (e) {
      console.error('saveUserUnderEventMembers failed');
      console.error(e);
      console.error(`eventId: ${favoriteEvent.id}`);
      console.error(`uid: ${uid}`);
    }
  };

  const saveUserEventPrompts = async () => {
    if (!filledPrompts) {
      return;
    }

    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const path = getUserEventPromptsPath(uid, favoriteEvent.id);
    const promptsToStore = getPromptsToStore(PromptSelectionType.Event, filledPrompts);

    try {
      await firebase.database().ref(path).set(promptsToStore);
    } catch (e) {
      console.error('saveUserUnderEventMembers failed');
      console.error(e);
      console.error(`eventId: ${favoriteEvent.id}`);
      console.error(`uid: ${uid}`);
      console.error(`filledPrompts: ${promptsToStore}`);
    }
  };

  const onPromptsSubmit = async () => {
    await saveEvent(favoriteEvent.locationId);
    await saveCityUnderStateEvents();
    await saveUserUnderEventMembers();
    await saveUserEventPrompts();
    navigation.navigate(Path.EventCarousel, { eventId: favoriteEvent.id });
  };

  return <PromptsManager onSubmit={onPromptsSubmit} selectionType={PromptSelectionType.Event} />;
};

export default EventPromptScreen;
