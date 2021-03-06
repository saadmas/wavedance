import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import PromptsManager, { PromptAnswer } from '../../../../components/PromptsManager/PromptsManager';
import { EdmTrainEvent } from '../../../../edmTrain/types';
import { WaveEvent } from '../../../../firebase/types';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { Prompt } from '../../../../state/enums/prompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { getPromptsToDisplay } from '../../../../utils/prompts/prompt.util';
import { EventStackParamList } from '../../EventStack';
import { saveUserEventPrompts } from '../../utils';

export interface EventPromptsProps {
  event: WaveEvent;
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

    navigation.navigate(Path.EventCarousel, { waveEvent: event });
  };

  return (
    <PromptsManager
      onSubmit={onPromptsSubmit}
      selectionType={PromptSelectionType.Event}
      previouslyFilledPrompts={previouslyFilledPrompts ? getPromptsToDisplay(previouslyFilledPrompts) : undefined}
    />
  );
};

export default EventPromptScreen;
