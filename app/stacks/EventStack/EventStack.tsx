import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { Path } from '../../routing/paths';
import EventsScreen from '../../screens/EventsScreen/EventsScreen';

const Stack = createNativeStackNavigator();

export type EventtackParamList = {
  [Path.EventList]: undefined;
  [Path.CurrentLocationSelect]: undefined;
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
      <Stack.Screen name={Path.EventList} component={EventsScreen} />
      <Stack.Screen name={Path.CurrentLocationSelect} component={() => null} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default EventStack;
