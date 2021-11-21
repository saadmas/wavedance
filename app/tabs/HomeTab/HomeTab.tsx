import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Path } from '../../routing/paths';
import EventsScreen from '../../screens/EventsScreen/EventsScreen';

const Tab = createMaterialBottomTabNavigator();

const foo = () => {
  return null;
};

const HomeTab = () => {
  return (
    <Tab.Navigator initialRouteName={Path.Events} shifting={true} barStyle={{ position: 'absolute' }} labeled={true}>
      <Tab.Screen name={Path.Events} component={EventsScreen} options={{ tabBarIcon: 'calendar' }} />
      <Tab.Screen name={Path.Matches} component={foo} options={{ tabBarIcon: 'chat' }} />
      <Tab.Screen name={Path.Profile} component={foo} options={{ tabBarIcon: 'account' }} />
    </Tab.Navigator>
  );
};

export default HomeTab;
