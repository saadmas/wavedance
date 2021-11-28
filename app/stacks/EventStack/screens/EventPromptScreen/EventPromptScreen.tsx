import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import PromptsManager from '../../../../components/PromptsManager/PromptsManager';
import { EdmTrainEvent } from '../../../../edmTrain/types';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { EventStackParamList } from '../../EventStack';
import { saveEvent, saveUserEventPrompts, saveUserUnderEventMembers } from '../../utils';

export interface EventPromptsProps {
  event: EdmTrainEvent;
  filledPrompts?: Map<EventPrompt, string>;
}

type EventPromptScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventPrompts>;

const EventPromptScreen = ({ route, navigation }: EventPromptScreenProps) => {
  const { event, filledPrompts } = route.params;

  const onPromptsSubmit = async () => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';

    await saveEvent(uid, event);
    await saveUserUnderEventMembers(uid, event.id);
    await saveUserEventPrompts(uid, event.id, filledPrompts);

    navigation.navigate(Path.EventCarousel, { eventId: event.id });
  };

  return <PromptsManager onSubmit={onPromptsSubmit} selectionType={PromptSelectionType.Event} />;
};

export default EventPromptScreen;
