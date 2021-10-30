import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Path } from '../../routing/paths';
import Welcome from './screens/Welcome/Welcome';
import SignUp from './screens/SignUp/SignUp';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  [Path.Welcome]: undefined;
  [Path.SignUp]: undefined;
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Path.Welcome}
      screenOptions={({ navigation }) => ({
        animation: 'slide_from_bottom',
        headerTransparent: true,
        headerTitle: '',
        headerLeft: ({ canGoBack }) =>
          canGoBack && <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />,
      })}
    >
      <Stack.Screen name={Path.Welcome} component={Welcome} />
      <Stack.Screen name={Path.SignUp} component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
