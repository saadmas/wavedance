import { Box, Button, Center, VStack } from 'native-base';
import styles from './Welcome.styles';
import * as React from 'react';
import { Text } from 'react-native';

const Welcome = () => {
  return (
    <Center style={styles.container}>
      <VStack space={5} position="absolute" bottom="10" alignItems="center">
        <Button width="100%" height={12} bgColor="logoSymbol" borderRadius={20} fontSize={2}>
          Sign up
        </Button>
        <Text style={styles.login}>Login</Text>
      </VStack>
    </Center>
  );
};

export default Welcome;
