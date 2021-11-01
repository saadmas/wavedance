import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './styles/theme';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './App.styles';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import { navigationRef } from './routing/rootNavigation';
import { Montserrat_400Regular, Lustria_400Regular, useFonts } from '@expo-google-fonts/dev'; //* delete and change to use reg package when done
import AppLoading from 'expo-app-loading';

const App = () => {
  const isSignedIn = false;

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Lustria_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.app}>
          <NavigationContainer ref={navigationRef} theme={theme}>
            {isSignedIn ? null : <AuthScreen />}
          </NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

export default App;
