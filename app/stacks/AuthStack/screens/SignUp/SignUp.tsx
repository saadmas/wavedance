import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import EmailPasswordForm from '../../../../components/EmailPasswordForm/EmailPasswordForm';
import { FirebaseNode, UserAdditionalInfo, UserBasicInfo, UserPhotos } from '../../../../firebase/keys';
import { getFirebasePath } from '../../../../firebase/utils';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';
import { useSignUpState } from '../../../../state/signUp/SignUpProvider';
import { getPromptsToStore } from '../../../../utils/prompts/prompt.util';
import { SignUpStepProps } from '../../../SignUpStack/SignUpStack';
import { styles } from './SignUp.styles';

interface SignUpProps extends SignUpStepProps {}

const SignUp = ({}: SignUpProps) => {
  const signUpState = useSignUpState();

  React.useEffect(() => {
    const foo = async () => {
      await uploadUserPhoto('indasind');
    };

    foo();
  }, []);

  const uploadUserPhoto = async (uid: string) => {
    const { profilePhotoUri } = signUpState;
    const path = getFirebasePath(FirebaseNode.UserPhotos, uid, UserPhotos.ProfilePhoto);

    try {
      const response = await fetch(profilePhotoUri);
      const blob = await response.blob();

      firebase.storage().ref(path).put(blob);
      // var ref = firebase.storage().ref(path).put('my-image');
      // return ref.put(blob);
    } catch (e) {
      //*
      console.error(e);
    }
  };

  const uploadUserPrompts = async (uid: string) => {
    const { prompts } = signUpState;
    const promptsToStore = getPromptsToStore(PromptSelectionType.General, prompts);
    const path = getFirebasePath(FirebaseNode.UserPrompts, uid);

    try {
      await firebase.database().ref(path).set(promptsToStore);
    } catch {}
  };

  const uploadUserAdditionalInfo = async (uid: string) => {
    const { currentLocation, hometown, passions, genres, instagramHandle, occupation } = signUpState;
    const path = getFirebasePath(FirebaseNode.UserAdditionalInfo, uid);

    try {
      await firebase
        .database()
        .ref(path)
        .set({
          [UserAdditionalInfo.CurrentLocation]: currentLocation,
          [UserAdditionalInfo.Hometown]: hometown,
          [UserAdditionalInfo.Passions]: [...passions],
          [UserAdditionalInfo.Genres]: [...genres],
          [UserAdditionalInfo.InstagramHandle]: instagramHandle ?? null,
          [UserAdditionalInfo.Occupation]: occupation ?? null,
        });
    } catch {}
  };

  const uploadUserBasicInfo = async (uid: string) => {
    const { birthday, name } = signUpState;
    const path = getFirebasePath(FirebaseNode.UserBasicInfo, uid);

    try {
      await firebase
        .database()
        .ref(path)
        .set({
          [UserBasicInfo.Birthday]: birthday,
          [UserBasicInfo.Name]: name,
        });
    } catch (e) {}
  };

  const uploadUserData = async () => {
    const uid = firebase.auth().currentUser?.uid;

    if (!uid) {
      return;
    }

    await uploadUserBasicInfo(uid);
    await uploadUserAdditionalInfo(uid);
    await uploadUserPrompts(uid);
    await uploadUserPhoto(uid);
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
    } catch (e) {
      //* handle error
    }
  };

  return (
    <View style={styles.container}>
      <EmailPasswordForm type="signUp" onFormSubmit={onSubmit} />
    </View>
  );
};

export default SignUp;
