import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import ErrorDisplay from '../../../../components/ErrorDisplay/ErrorDisplay';
import LottieAnimation from '../../../../components/LottieAnimation/LottieAnimation';
import { EdmTrainEvent } from '../../../../edmTrain/types';
import { getUserWavesReceivedPath } from '../../../../firebase/utils';
import { ResponseStatus } from '../../../../state/enums/responseStatus';
import WaveList from './components/WaveList/WaveList';

// K = User ID, V = events the user waved during
export type Waves = Map<string, EdmTrainEvent[]>;

const WaveListScreen = () => {
  const [waves, setWaves] = React.useState<Waves>(new Map());
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  React.useEffect(() => {
    const fetchWaves = async () => {
      //f const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const uid = 'foo';
      const path = getUserWavesReceivedPath(uid);

      try {
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();

        if (!value) {
          setResponseStatus(ResponseStatus.Success);
          return;
        }

        const fetchedWaves: Waves = new Map();

        Object.entries(value).forEach(([userId, events]) => {
          fetchedWaves.set(userId, Object.values(events as any));
        });

        setWaves(fetchedWaves);
        setResponseStatus(ResponseStatus.Success);
      } catch (e) {
        console.error('fetchWaves failed');
        console.error(e);
        console.error(`uid: ${uid}`);
        setResponseStatus(ResponseStatus.Error);
      }
    };

    fetchWaves();
  }, []);

  if (responseStatus === ResponseStatus.Loading) {
    return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  if (responseStatus === ResponseStatus.Error) {
    return <ErrorDisplay />;
  }

  if (waves.size === 0) {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <LottieAnimation
          source={require(`../../../../../assets/animations/wave-lines.json`)}
          finalFramePosition={1}
          shouldLoop={true}
          style={{
            position: 'absolute',
            top: 0,
            width: 1000,
            height: 300,
          }}
        />
        <Text style={{ fontSize: 18, letterSpacing: 0.8 }}>No waves yet!</Text>
        <LottieAnimation
          source={require(`../../../../../assets/animations/wave-lines.json`)}
          finalFramePosition={1}
          shouldLoop={true}
          style={{
            position: 'absolute',
            bottom: 0,
            width: 1000,
            height: 300,
          }}
        />
      </View>
    );
  }

  return <WaveList waves={waves} />;
};

export default WaveListScreen;
