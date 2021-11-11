import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import EmailPasswordForm from '../../../../components/EmailPasswordForm/EmailPasswordForm';
import { FirebaseNode, UserAdditionalInfo, UserBasicInfo } from '../../../../firebase/keys';
import { useSignUpState } from '../../../../state/signUp/SignUpProvider';
import { getPromptsToStore } from '../../../../utils/prompts/prompt.util';
import { SignUpStepProps } from '../../../SignUpStack/SignUpStack';
import { styles } from './SignUp.styles';

interface SignUpProps extends SignUpStepProps {}

const SignUp = ({}: SignUpProps) => {
  const signUpState = useSignUpState();

  const uploadUserPrompts = async (uid?: string) => {
    const { prompts } = signUpState;
    const promptsToStore = getPromptsToStore(prompts);

    try {
      await firebase
        .database()
        .ref(`${FirebaseNode.Users}/${uid}/${FirebaseNode.UserPrompts}`)
        .set({ ...promptsToStore });
    } catch {}
  };

  const uploadUserBasicInfo = async (uid?: string) => {
    const { birthday, name } = signUpState;

    console.log(uid);
    try {
      const res = await firebase
        .database()
        .ref(`${FirebaseNode.Users}/${uid}/${FirebaseNode.UserBasicInfo}`)
        .set({
          [UserBasicInfo.Birthday]: 'birthday',
          [UserBasicInfo.Name]: 'saad',
        });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadUserAdditionalInfo = async (uid?: string) => {
    const { currentLocation, hometown, passions, genres, instagramHandle } = signUpState;

    try {
      await firebase
        .database()
        .ref(`${FirebaseNode.Users}/${uid}/${FirebaseNode.UserBasicInfo}`)
        .set({
          [UserAdditionalInfo.CurrentLocation]: currentLocation,
          [UserAdditionalInfo.Hometown]: hometown,
          [UserAdditionalInfo.Passions]: passions,
          [UserAdditionalInfo.Genres]: genres,
          [UserAdditionalInfo.InstagramHandle]: instagramHandle,
        });
    } catch {}
  };

  const uploadUserData = async () => {
    const uid = firebase.auth().currentUser?.uid;
    await uploadUserBasicInfo(uid);
    // await uploadUserAdditionalInfo(uid);
    // await uploadUserPrompts(uid);
  };

  const createUserInFirebase = async (email: string, password: string): Promise<string | undefined> => {
    const signUpResponse = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const idToken = await signUpResponse.user?.getIdToken();
    return idToken;
  };

  const onSubmit = async (email: string, password: string) => {
    try {
      await createUserInFirebase(email, password);
      await uploadUserData();
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
function getPromptInverseMap() {
  throw new Error('Function not implemented.');
}
