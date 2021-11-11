import * as React from 'react';
import { View } from 'react-native';
import EmailPasswordForm from '../../../../components/EmailPasswordForm/EmailPasswordForm';
import { fb } from '../../../../firebase/config';
import { useSignUpState } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../../SignUpStack/SignUpStack';
import { styles } from './SignUp.styles';
import * as SecureStore from 'expo-secure-store';
import { secureStorageUserTokenKey } from '../../../../state/auth/keys';
import { useAuthUpdater } from '../../../../state/auth/AuthProvider';

interface SignUpProps extends SignUpStepProps {}

const SignUp = ({}: SignUpProps) => {
  const signUpState = useSignUpState();
  const setUserToken = useAuthUpdater();

  const uploadUserDetails = () => {};

  const createUserInFirebase = async (email: string, password: string): Promise<string | undefined> => {
    const signUpResponse = await fb.auth().createUserWithEmailAndPassword(email, password);
    const idToken = await signUpResponse.user?.getIdToken();
    return idToken;
  };

  const storeToken = async (token?: string) => {
    if (token) {
      await SecureStore.setItemAsync(secureStorageUserTokenKey, token);
      setUserToken(token);
    }
  };

  const onSubmit = async (email: string, password: string) => {
    try {
      const idToken = await createUserInFirebase(email, password);
      await storeToken(idToken);
      await uploadUserDetails();
    } catch {
      /// handle error
    }
  };

  return (
    <View style={styles.container}>
      <EmailPasswordForm type="signUp" onFormSubmit={onSubmit} />
    </View>
  );
};

export default SignUp;
