import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { EdmTrainEvent, EdmTrainLocation } from '../../edmTrain/types';
import { Path } from '../../routing/paths';
import { EventPrompt } from '../../state/enums/eventPrompt';
import EventListScreen from './screens/EventListScreen/EventListScreen';
import EventPromptScreen from './screens/EventPromptScreen/EventPromptScreen';
import LocationSelectScreen from './screens/LocationSelectScreen/LocationSelectScreen';

const Stack = createNativeStackNavigator();

export type EventStackParamList = {
  [Path.LocationSelect]: undefined;
  [Path.EventList]: { location?: EdmTrainLocation };
  [Path.EventPrompts]: {
    locationId: number;
    event: EdmTrainEvent;
    eventPhotoUri?: string;
    filledPrompts?: Map<EventPrompt, string>;
  };
};

const EventStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Path.EventList}
      screenOptions={({ navigation }) => ({
        animation: 'simple_push',
        headerTransparent: true,
        headerTitle: '',
        headerShown: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack && <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />,
      })}
    >
      <Stack.Screen name={Path.EventList} component={EventListScreen} />
      <Stack.Screen name={Path.LocationSelect} component={LocationSelectScreen} options={{ headerShown: true }} />
      <Stack.Screen name={Path.LocationSelect} component={EventPromptScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default EventStack;
