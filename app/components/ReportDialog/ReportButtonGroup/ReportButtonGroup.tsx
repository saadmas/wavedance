import * as React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface ReportButtonGroupProps {
  onHideUser: () => void;
  onReportUser: () => void;
}

const ReportButtonGroup = ({ onHideUser, onReportUser }: ReportButtonGroupProps) => {
  const renderButton = (text: string, icon: string, color: string, onPress: () => void) => {
    return (
      <Button
        mode="outlined"
        icon={icon}
        style={{ width: 200, borderRadius: 20, borderColor: color, marginBottom: 15 }}
        labelStyle={{ fontSize: 12, color }}
        uppercase={false}
        onPress={onPress}
        theme={{ colors: { primary: color } }}
      >
        {text}
      </Button>
    );
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      {renderButton('Hide', 'eye-off-outline', 'yellow', onHideUser)}
      {renderButton('Hide & Report', 'account-cancel-outline', 'red', onReportUser)}
    </View>
  );
};

export default ReportButtonGroup;
