import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './styles/theme';
import { View, Text } from 'react-native';
import { styles } from './App.styles';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import { navigationRef } from './routing/rootNavigation';
import { Montserrat_400Regular, Lustria_400Regular, useFonts } from '@expo-google-fonts/dev'; //* delete and change to use reg package when done
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';

const App = () => {
  const [isLoadingUser, setIsLoadingUser] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Lustria_400Regular,
  });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
      setIsLoadingUser(false);
    });
  }, []);

  if (!fontsLoaded || isLoadingUser) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.app}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          {isLoggedIn ? <Text>SIGNED IN!</Text> : <AuthScreen />}
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
};

export default App;
