import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './styles/theme';
import { View } from 'react-native';
import { styles } from './App.styles';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import { navigationRef } from './routing/rootNavigation';
import { Montserrat_400Regular, Lustria_400Regular, useFonts } from '@expo-google-fonts/dev'; //* delete and change to use reg package when done
import AppLoading from 'expo-app-loading';
import * as SecureStore from 'expo-secure-store';
import { useAuthState, useAuthUpdater } from './state/auth/AuthProvider';

const App = () => {
  const userToken = useAuthState();
  const setUserToken = useAuthUpdater();

  const [haveAttempedToGetUserToken, setHaveAttempedToGetUserToken] = React.useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Lustria_400Regular,
  });

  React.useEffect(() => {
    const tryGetUserToken = async () => {
      try {
        const secureStoreToken = await SecureStore.getItemAsync('userToken');
        if (secureStoreToken) {
          setUserToken(secureStoreToken);
        }
      } catch {}
      setHaveAttempedToGetUserToken(true);
    };

    tryGetUserToken();
  }, []);

  if (!fontsLoaded || !haveAttempedToGetUserToken) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.app}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          {userToken ? null : <AuthScreen />}
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
};

export default App;
