import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  login: {
    color: 'white',
  },
  authButtonGroup: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  signUpButton: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 40,
    backgroundColor: '#fB2588',
  },
});
