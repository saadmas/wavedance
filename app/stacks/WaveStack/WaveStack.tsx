import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { Path } from '../../routing/paths';
import WaveListScreen from './screens/WaveListScreen/WaveListScreen';

const Stack = createNativeStackNavigator();

export type WaveStackParamList = {
  [Path.WaveList]: undefined;
};

const WaveStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Path.WaveList}
      screenOptions={({ navigation }) => ({
        animation: 'slide_from_bottom',
        headerTransparent: true,
        headerTitle: '',
        headerShown: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack && <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />,
      })}
    >
      <Stack.Screen name={Path.WaveList} component={WaveListScreen} />
    </Stack.Navigator>
  );
};

export default WaveStack;
