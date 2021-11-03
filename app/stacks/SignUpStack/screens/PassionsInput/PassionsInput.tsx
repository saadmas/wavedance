import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import NextScreenButton from '../../../../components/NextScreenButton/NextScreenButton';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import { FlatList, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { Passion } from '../../../../state/enums/passion';

interface PassionsInputProps extends SignUpStepProps {}

const passions = Object.keys(Passion);

const PassionsInput = ({ goToNextStep }: PassionsInputProps) => {
  const { colors } = useTheme();
  const [selectedPassions, setSelectedPassions] = React.useState<Set<string>>(new Set());
  const dispatch = useSignUpDispatch();
  const maxPassions = 5;

  const onPassionsSubmit = () => {
    // dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
    goToNextStep();
  };

  const onPassionToggle = (passion: string) => {
    setSelectedPassions(prevSelectedPassions => {
      if (prevSelectedPassions.has(passion)) {
        prevSelectedPassions.delete(passion);
      } else if (prevSelectedPassions.size < maxPassions) {
        prevSelectedPassions.add(passion);
      }

      return new Set(prevSelectedPassions);
    });
  };

  const isNextButtonDisabled = () => {
    const doPassionsMeetRequirements = selectedPassions.size >= 3;
    return !doPassionsMeetRequirements;
  };

  const renderPassionPill = React.useCallback(
    ({ item }: any) => {
      const passionPill = (
        <Button
          mode="outlined"
          key={item}
          style={{
            borderRadius: 40,
            margin: 10,
            marginLeft: 0,
            borderColor: selectedPassions.has(item) ? colors.primary : colors.text,
          }}
          labelStyle={{ fontSize: 12 }}
          compact={true}
          uppercase={false}
          onPress={() => onPassionToggle(item)}
          theme={{ colors: { primary: selectedPassions.has(item) ? colors.primary : colors.text } }}
        >
          {item}
        </Button>
      );
      return passionPill;
    },
    [selectedPassions]
  );

  return (
    <>
      <Title title="What are your passions?" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text>Select at least 3</Text>
        <Text>
          {selectedPassions.size}/{maxPassions}
        </Text>
      </View>
      <FlatList
        data={passions}
        renderItem={renderPassionPill}
        keyExtractor={item => item}
        numColumns={3}
        initialNumToRender={20}
        style={{ flex: 1, flexGrow: 1 }}
      />
      <NextScreenButton onPress={onPassionsSubmit} isDisabled={isNextButtonDisabled()} />
    </>
  );
};

export default PassionsInput;
