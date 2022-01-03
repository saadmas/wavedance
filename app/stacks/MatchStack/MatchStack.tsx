import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';
import { Path } from '../../routing/paths';
import MatchListScreen from './screens/MatchListScreen/MatchListScreen';

const Stack = createNativeStackNavigator();

export type MatchStackParamList = {
  [Path.MatchList]: undefined;
  [Path.MatchChat]: { chatId: string };
};

const MatchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Path.MatchList}
      screenOptions={({ navigation }) => ({
        animation: 'slide_from_bottom',
        headerTransparent: true,
        headerTitle: '',
        headerShown: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack && <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />,
      })}
    >
      <Stack.Screen name={Path.MatchList} component={MatchListScreen} />
      {/* <Stack.Screen
        name={Path.MatchFullUserProfile}
        component={MatchFullUserProfileScreen}
        options={{ headerShown: true, contentStyle: { paddingTop: 45, paddingHorizontal: defaultScreenPadding } }}
      /> */}
    </Stack.Navigator>
  );
};

export default MatchStack;
