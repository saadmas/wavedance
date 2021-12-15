import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Path } from '../../routing/paths';
import EventStack from '../../stacks/EventStack/EventStack';

const Tab = createMaterialBottomTabNavigator();

const foo = () => {
  return null;
};

const HomeTab = () => {
  return (
    <Tab.Navigator initialRouteName={Path.Events} barStyle={{ position: 'absolute', maxHeight: 45 }} labeled={false}>
      <Tab.Screen name={Path.Events} component={EventStack} options={{ tabBarIcon: 'calendar' }} />
      <Tab.Screen name={Path.Matches} component={foo} options={{ tabBarIcon: 'chat' }} />
      <Tab.Screen name={Path.Profile} component={foo} options={{ tabBarIcon: 'account' }} />
    </Tab.Navigator>
  );
};

export default HomeTab;
