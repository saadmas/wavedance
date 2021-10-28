import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Path } from '../../routing/paths';
import Welcome from './screens/Welcome/Welcome';

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  [Path.Welcome]: undefined;
  [Path.SignUp]: undefined;
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={Path.Welcome} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Path.Welcome} component={Welcome} />
    </Stack.Navigator>
  );
};

export default AuthStack;
