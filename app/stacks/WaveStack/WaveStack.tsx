import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { EdmTrainEvent } from '../../edmTrain/types';
import { Path } from '../../routing/paths';
import { defaultScreenPadding } from '../../styles/theme';
import WaveFullUserProfileScreen from './screens/WaveFullUserProfileScreen/WaveFullUserProfileScreen';
import WaveListScreen from './screens/WaveListScreen/WaveListScreen';

const Stack = createNativeStackNavigator();

export type WaveStackParamList = {
  [Path.WaveList]: undefined;
  [Path.WaveFullUserProfile]: { userId: string; event: EdmTrainEvent };
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
      <Stack.Screen
        name={Path.WaveFullUserProfile}
        component={WaveFullUserProfileScreen}
        options={{ headerShown: true, contentStyle: { paddingTop: 45, paddingHorizontal: defaultScreenPadding } }}
      />
    </Stack.Navigator>
  );
};

export default WaveStack;
