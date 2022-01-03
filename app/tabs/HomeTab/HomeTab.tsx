import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Path } from '../../routing/paths';
import EventStack from '../../stacks/EventStack/EventStack';
import WaveStack from '../../stacks/WaveStack/WaveStack';
import MatchStack from '../../stacks/MatchStack/MatchStack';

const Tab = createMaterialBottomTabNavigator();

const foo = () => {
  return null;
};

const HomeTab = () => {
  return (
    <Tab.Navigator initialRouteName={Path.Events} labeled={true}>
      <Tab.Screen name={Path.Events} component={EventStack} options={{ tabBarIcon: 'calendar' }} />
      <Tab.Screen name={Path.Waves} component={WaveStack} options={{ tabBarIcon: 'waves' }} />
      <Tab.Screen name={Path.Matches} component={MatchStack} options={{ tabBarIcon: 'chat' }} />
      <Tab.Screen name={Path.Profile} component={foo} options={{ tabBarIcon: 'account' }} />
    </Tab.Navigator>
  );
};

export default HomeTab;
