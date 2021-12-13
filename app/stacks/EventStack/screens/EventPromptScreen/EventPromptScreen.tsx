import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import PromptsManager, { PromptAnswer } from '../../../../components/PromptsManager/PromptsManager';
import { EdmTrainEvent } from '../../../../edmTrain/types';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { Prompt } from '../../../../state/enums/prompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { EventStackParamList } from '../../EventStack';
import { saveUserEventPrompts } from '../../utils';

export interface EventPromptsProps {
  event: EdmTrainEvent;
  isEditMode?: boolean;
  previouslyFilledPrompts?: Object;
}

type EventPromptScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventPrompts>;

const EventPromptScreen = ({ route, navigation }: EventPromptScreenProps) => {
  const { event, previouslyFilledPrompts, isEditMode } = route.params;

  const onPromptsSubmit = async (filledPrompts: Map<EventPrompt | Prompt, PromptAnswer>) => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    await saveUserEventPrompts(uid, event.id, filledPrompts as Map<EventPrompt, PromptAnswer>);

    if (isEditMode) {
      navigation.goBack();
      return;
    }

    navigation.navigate(Path.EventCarousel, { eventId: event.id });
  };

  return (
    <PromptsManager
      onSubmit={onPromptsSubmit}
      selectionType={PromptSelectionType.Event}
      previouslyFilledPrompts={previouslyFilledPrompts ? new Map(Object.entries(previouslyFilledPrompts)) : undefined}
    />
  );
};

export default EventPromptScreen;
