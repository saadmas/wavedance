import { styles } from './Welcome.styles';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface WelcomeProps {
  onSignUp: () => void;
  onLogin: () => void;
}

const Welcome = ({ onSignUp, onLogin }: WelcomeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.authButtonGroup}>
        <Button mode="contained" uppercase={false} style={styles.signUpButton} onPress={onSignUp}>
          Sign up
        </Button>
        <TouchableOpacity onPress={onLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
