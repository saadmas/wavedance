import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './styles/theme';
import { styles } from './App.styles';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import { navigationRef } from './routing/rootNavigation';
import { Montserrat_400Regular, Lustria_400Regular, useFonts } from '@expo-google-fonts/dev'; //* delete and change to use reg package when done
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeTab from './tabs/HomeTab/HomeTab';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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
      <SafeAreaProvider>
        <SafeAreaView style={styles.app}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer ref={navigationRef} theme={theme}>
              {isLoggedIn ? <HomeTab /> : <AuthScreen />}
            </NavigationContainer>
          </QueryClientProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
