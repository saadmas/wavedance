import * as React from 'react';
import { View } from 'react-native';
import EmailPasswordForm from '../../../../components/EmailPasswordForm';
import { styles } from './SignUp.styles';

const SignUp = () => {
  const onSubmit = (email: string, password: string) => {
    return;
  };

  return (
    <View style={styles.container}>
      <EmailPasswordForm type="signUp" onFormSubmit={onSubmit} />
    </View>
  );
};

export default SignUp;
