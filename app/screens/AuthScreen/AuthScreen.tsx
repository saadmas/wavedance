import * as React from 'react';
import Welcome from '../../stacks/AuthStack/screens/Welcome/Welcome';
import SignUpStack from '../../stacks/SignUpStack/SignUpStack';
import { Text } from 'react-native';

type AuthFlowType = 'signIn' | 'signUp';

const AuthScreen = () => {
  const [authFlowType, setAuthFlowType] = React.useState<AuthFlowType | undefined>(undefined);

  const onLogin = () => {
    setAuthFlowType('signIn');
  };

  const onSignUp = () => {
    setAuthFlowType('signUp');
  };

  switch (authFlowType) {
    case 'signIn':
      return <Text>SIGN IN FLOW</Text>;
    case 'signUp':
      return <SignUpStack />;
    default:
      return <Welcome onLogin={onLogin} onSignUp={onSignUp} />;
  }
};

export default AuthScreen;
