import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import PromptsManager from '../../../../components/PromptsManager/PromptsManager';
import { FavoriteEvent } from '../../../../firebase/types';
import { Path } from '../../../../routing/paths';
import { EventPrompt } from '../../../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { defaultScreenPadding } from '../../../../styles/theme';
import { EventStackParamList } from '../../EventStack';

export interface EventPromptsProps {
  favoriteEvent: FavoriteEvent;
  filledPrompts?: Map<EventPrompt, string>;
}

type EventPromptScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventPrompts>;

const EventPromptScreen = ({ route }: EventPromptScreenProps) => {
  const { favoriteEvent, filledPrompts } = route.params;

  const onPromptsSubmit = () => {
    ///
  };

  return <PromptsManager onSubmit={onPromptsSubmit} selectionType={PromptSelectionType.Event} />;
};

export default EventPromptScreen;
