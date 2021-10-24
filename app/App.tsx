import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './styles/theme';
import { View } from 'react-native';
import { styles } from './App.styles';
import AuthStack from './stacks/AuthStack/AuthStack';

const App = () => {
  const isSignedIn = false;

  return (
    <PaperProvider theme={theme}>
      <View style={styles.app}>
        <NavigationContainer theme={theme}>{isSignedIn ? null : <AuthStack />}</NavigationContainer>
      </View>
    </PaperProvider>
  );
};

export default App;
