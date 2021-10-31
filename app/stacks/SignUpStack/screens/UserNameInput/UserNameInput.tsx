import * as React from 'react';
import { Text } from 'react-native';
import { SignUpStepProps } from '../../SignUpStack';

interface UserNameInputProps extends SignUpStepProps {}

const UserNameInput = ({}: UserNameInputProps) => {
  return <Text>USER NAME INPUT</Text>;
};

export default UserNameInput;
