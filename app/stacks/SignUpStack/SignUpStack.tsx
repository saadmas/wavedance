import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Path } from '../../routing/paths';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export type SignUpStackParamList = {
  [Path.SignUp]: undefined;
};

const SignUpStack = () => {
  return null;
  // return (
  //   <Stack.Navigator
  //     initialRouteName={Path.Welcome}
  //     screenOptions={({ navigation }) => ({
  //       animation: 'slide_from_bottom',
  //       headerTransparent: true,
  //       headerTitle: '',
  //       headerLeft: ({ canGoBack }) =>
  //         canGoBack && <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />,
  //     })}
  //     <Stac
  //   ></Stack.Navigator>
  // );
};

export default SignUpStack;
