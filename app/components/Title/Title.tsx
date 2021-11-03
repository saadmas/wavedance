import * as React from 'react';
import * as Animatable from 'react-native-animatable';
import { Title as RnpTitle, useTheme } from 'react-native-paper';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  const { fonts } = useTheme();

  return (
    <Animatable.View animation="fadeInLeft">
      <RnpTitle
        style={{
          fontSize: 35,
          paddingTop: 10,
          paddingBottom: 10,
          lineHeight: 40,
          fontFamily: fonts.thin.fontFamily,
        }}
      >
        {title}
      </RnpTitle>
    </Animatable.View>
  );
};

export default Title;
