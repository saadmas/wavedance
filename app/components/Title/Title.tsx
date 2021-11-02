import * as React from 'react';
import * as Animatable from 'react-native-animatable';
import { Title as RnpTitle } from 'react-native-paper';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <Animatable.View animation="fadeInLeft">
      <RnpTitle
        style={{
          fontSize: 35,
          paddingTop: 10,
          paddingBottom: 10,
          lineHeight: 40,
          fontFamily: 'Lustria_400Regular',
        }}
      >
        {title}
      </RnpTitle>
    </Animatable.View>
  );
};

export default Title;
