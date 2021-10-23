import { NavigationContainer } from '@react-navigation/native';
import Welcome from './screens/Welcome/Welcome';
import * as React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import theme from './styles/theme';

export default function App() {
  const isSignedIn = false;

  return (
    <NativeBaseProvider theme={theme}>
      <Box bgColor="bg" safeArea color="white" height="100%" width="100%">
        <NavigationContainer>{isSignedIn ? null : <Welcome />}</NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}
