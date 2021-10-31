import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './styles/theme';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './App.styles';
import AuthScreen from './screens/AuthScreen/AuthScreen';

const App = () => {
  const isSignedIn = false;

  return (
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.app}>
          <NavigationContainer theme={theme}>{isSignedIn ? null : <AuthScreen />}</NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

export default App;
