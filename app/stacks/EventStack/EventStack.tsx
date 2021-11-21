import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { Path } from '../../routing/paths';
import EventListScreen from './screens/EventListScreen/EventListScreen';
import LocationSelectScreen from './screens/LocationSelectScreen/LocationSelectScreen';

const Stack = createNativeStackNavigator();

export type EventStackParamList = {
  [Path.EventList]: undefined;
  [Path.CurrentLocationSelect]: undefined;
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
      <Stack.Screen
        name={Path.CurrentLocationSelect}
        component={LocationSelectScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default EventStack;
