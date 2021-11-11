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
import * as SecureStore from 'expo-secure-store';
import { useAuthState, useAuthUpdater } from './state/auth/AuthProvider';
import { fb } from './firebase/config';
import { secureStorageUserTokenKey } from './state/auth/keys';

const App = () => {
  const userToken = useAuthState();
  const setUserToken = useAuthUpdater();

  const [isLoadingUser, setIsLoadingUser] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Lustria_400Regular,
  });

  React.useEffect(() => {
    // const tryGetUserToken = async () => {
    //   try {
    //     const secureStoreToken = await SecureStore.getItemAsync(secureStorageUserTokenKey);
    //     console.log('secureStoreToken', secureStoreToken);
    //     if (secureStoreToken) {
    //       const refreshedToken = await fb.auth().currentUser?.reauthenticateWithCredential;
    //       console.log('refreshedToken', refreshedToken);
    //       if (refreshedToken) {
    //         setUserToken(refreshedToken);
    //         await SecureStore.setItemAsync(secureStorageUserTokenKey, refreshedToken);
    //       }
    //     }
    //   } catch {}
    //   setHaveAttempedToGetUserToken(true);
    // };

    fb.auth().onAuthStateChanged(user => {
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
