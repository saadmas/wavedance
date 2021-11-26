import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import PromptsManager from '../../../../components/PromptsManager/PromptsManager';
import { FavoriteEvent } from '../../../../firebase/types';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { EventStackParamList } from '../../EventStack';

export interface EventPromptsProps {
  favoriteEvent: FavoriteEvent;
  filledPrompts?: Map<EventPrompt, string>;
}

type EventPromptScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventPrompts>;

const EventPromptScreen = ({ route, navigation }: EventPromptScreenProps) => {
  const { favoriteEvent, filledPrompts } = route.params;

  const onPromptsSubmit = () => {
    ///
    navigation.navigate(Path.EventCarousel, { eventId: favoriteEvent.id });
  };

  return <PromptsManager onSubmit={onPromptsSubmit} selectionType={PromptSelectionType.Event} />;
};

export default EventPromptScreen;
