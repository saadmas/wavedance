import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { EdmTrainLocation } from '../../edmTrain/types';
import { Path } from '../../routing/paths';
import { defaultScreenPadding } from '../../styles/theme';
import EventCarouselScreen from './screens/EventCarouselScreen/EventCarouselScreen';
import EventListScreen from './screens/EventListScreen/EventListScreen';
import EventPromptScreen, { EventPromptsProps } from './screens/EventPromptScreen/EventPromptScreen';
import LocationSelectScreen from './screens/LocationSelectScreen/LocationSelectScreen';

const Stack = createNativeStackNavigator();

export type EventStackParamList = {
  [Path.LocationSelect]: undefined;
  [Path.EventList]: { location?: EdmTrainLocation };
  [Path.EventCarousel]: { eventId: number };
  [Path.EventPrompts]: EventPromptsProps;
};

const EventStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Path.EventList}
      screenOptions={({ navigation }) => ({
        animation: 'slide_from_bottom',
        headerTransparent: true,
        headerTitle: '',
        headerShown: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack && <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />,
      })}
    >
      <Stack.Screen name={Path.EventList} component={EventListScreen} />
      <Stack.Screen name={Path.LocationSelect} component={LocationSelectScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={Path.EventCarousel}
        component={EventCarouselScreen}
        options={{ headerShown: true, contentStyle: { paddingTop: 45, paddingHorizontal: defaultScreenPadding } }}
      />
      <Stack.Screen
        name={Path.EventPrompts}
        component={EventPromptScreen}
        options={{ contentStyle: { paddingTop: 0, paddingHorizontal: defaultScreenPadding } }}
      />
    </Stack.Navigator>
  );
};

export default EventStack;
