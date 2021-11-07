import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Path } from '../../routing/paths';
import { PromptDrawerParamList } from '../../stacks/SignUpStack/screens/PromptsManager/PromptsManager';
import { Prompt } from '../../state/enums/prompt';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import Title from '../Title/Title';

interface PromptsSelectorProps {
  filledPrompts: Map<Prompt, string>;
  navigation: DrawerNavigationProp<PromptDrawerParamList, Path.SignUpPromptSelector>;
  onPromptsSubmit: () => void;
}

const PromptsSelector = ({ filledPrompts, onPromptsSubmit, navigation }: PromptsSelectorProps) => {
  const openPromptDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <>
      <Title title="Let's get to know you" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text>Answer 3 prompts</Text>
        <Text>{filledPrompts.size}/3</Text>
      </View>
      <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
        {filledPrompts.size < 3 && (
          <Button
            icon="plus"
            mode="outlined"
            onPress={openPromptDrawer}
            theme={{ colors: { primary: '#fff' } }}
            labelStyle={{ fontSize: 10 }}
            style={{ width: '50%', marginTop: filledPrompts.size ? undefined : 100 }}
          >
            Add prompt
          </Button>
        )}
      </ScrollView>
      <NextScreenButton onPress={onPromptsSubmit} isDisabled={filledPrompts.size < 3} />
    </>
  );
};
3;

export default PromptsSelector;
