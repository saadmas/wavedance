import { styles } from './Welcome.styles';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../AuthScreen/AuthScreen';
import { Path } from '../../routing/paths';

interface WelcomeProps extends NativeStackScreenProps<AuthStackParamList, Path.Welcome> {}

const Welcome = ({ navigation }: WelcomeProps) => {
  const onSignUpPress = () => {
    navigation.navigate(Path.SignUp);
  };

  return (
    <View style={styles.container}>
      <View style={styles.authButtonGroup}>
        <Button mode="contained" uppercase={false} style={styles.signUpButton} onPress={onSignUpPress}>
          Sign up
        </Button>
        <Text style={styles.login}>Login</Text>
      </View>
    </View>
  );
};

export default Welcome;
