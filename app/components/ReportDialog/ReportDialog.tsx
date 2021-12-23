import firebase from 'firebase';
import * as React from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import { FirebaseNode } from '../../firebase/keys';
import { SubmittedReport } from '../../firebase/types';
import { getFirebasePath } from '../../firebase/utils';
import {
  FakeSpamOrScammer,
  HateSpeech,
  InappropriateBehavior,
  InappropriateContent,
  Report,
  SomeoneIsInDanger,
  UnderageOrMinor,
} from '../../state/enums/report';
import InputCard from '../InputCard/InputCard';
import ReportButtonGroup from './ReportButtonGroup/ReportButtonGroup';
import ReportOptions from './ReportOptions/ReportOptions';

interface ReportDialogProps {
  reportedOnId: string;
  eventId?: number;
}

const ReportDialog = ({ eventId, reportedOnId }: ReportDialogProps) => {
  const { colors, fonts } = useTheme();
  const borderRadius = 10;

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [actionType, setActionType] = React.useState<'Hide' | 'Report'>('Hide');
  const [report, setReport] = React.useState<string | undefined>(undefined);
  const [reportCategory, setReportCategory] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (report === Report.NotInterested) {
      setReportCategory(Report.NotInterested);
    }

    if (report === Report.Other) {
      setReportCategory(Report.Other);
    }
  }, [report]);

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = async (reportDetails: string) => {
    const reportToSubmit: SubmittedReport = {
      reportedUserId: reportedOnId,
      actionType,
      report: report ?? '',
      category: reportCategory ?? '',
      date: new Date().toString(),
      details: reportDetails,
      eventId,
    };

    //f const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const uid = 'foo';
    const path = getFirebasePath(FirebaseNode.UserReports, uid);

    try {
      await firebase.database().ref(path).push(reportToSubmit);
    } catch (e) {
      console.log('Failed to submit user report');
      console.error(e);
      console.error(reportToSubmit);
    }
  };

  const goBack = () => {
    if (reportCategory) {
      setReportCategory(undefined);
      if (reportCategory === report) {
        setReport(undefined);
      }
      return;
    }

    if (report) {
      setReport(undefined);
      return;
    }
  };

  const openHideDialog = () => {
    setIsDialogOpen(true);
    setActionType('Hide');
  };

  const openReportDialog = () => {
    setIsDialogOpen(true);
    setActionType('Report');
  };

  const closeDialog = () => {
    setReport(undefined);
    setReportCategory(undefined);
    setIsDialogOpen(false);
  };

  const getTitle = () => {
    if (report) {
      return report;
    }

    return actionType;
  };

  const getActionTypeVerb = () => {
    const actionTypeVerb = actionType === 'Hide' ? 'hiding' : 'reporting';
    return actionTypeVerb;
  };

  const getSubTitle = () => {
    if (reportCategory && reportCategory !== report) {
      return reportCategory;
    }

    if (report) {
      return;
    }

    return `Don\'t worry, your feedback is private. They won\'t know you're ${getActionTypeVerb()} them.`;
  };

  const getReportCategory = (report?: Report) => {
    switch (report) {
      case Report.FakeSpamOrScammer:
        return FakeSpamOrScammer;
      case Report.HateSpeech:
        return HateSpeech;
      case Report.InappropriateBehavior:
        return InappropriateBehavior;
      case Report.FakeSpamOrScammer:
        return FakeSpamOrScammer;
      case Report.InappropriateContent:
        return InappropriateContent;
      case Report.SomeoneIsInDanger:
        return SomeoneIsInDanger;
      case Report.UnderageOrMinor:
        return UnderageOrMinor;
      case Report.NotInterested:
      default:
        return;
    }
  };

  const renderUserInput = () => {
    if (reportCategory) {
      return (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10, paddingRight: 30, paddingLeft: 10, minHeight: 300 }}
          showsVerticalScrollIndicator={false}
        >
          <InputCard title="" onSubmit={onSubmit} placeholder="Tell us what happened" blurOnSubmit={false} />
        </ScrollView>
      );
    }

    if (report) {
      const reportKey = Object.entries(Report).find(([_, text]) => text === report);
      const reportCategory = getReportCategory(reportKey?.[1]);
      if (reportCategory) {
        return <ReportOptions onOptionSelect={setReportCategory} options={Object.values(reportCategory)} />;
      }
    }

    return <ReportOptions onOptionSelect={setReport} options={Object.values(Report)} />;
  };

  const subTitle = getSubTitle();

  return (
    <>
      <ReportButtonGroup onHideUser={openHideDialog} onReportUser={openReportDialog} />
      <Portal>
        <Dialog
          visible={isDialogOpen}
          onDismiss={closeDialog}
          style={{
            borderRadius,
            backgroundColor: colors.onSurface,
            width: reportCategory ? '100%' : undefined,
            height: reportCategory ? '100%' : undefined,
            marginLeft: reportCategory ? 0 : undefined,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              borderTopEndRadius: borderRadius,
              borderTopStartRadius: borderRadius,
            }}
          >
            {report && <IconButton icon="chevron-left" size={20} onPress={goBack} />}
            <TouchableWithoutFeedback onPress={closeKeyboard}>
              <View style={{ padding: 20, paddingTop: report ? 0 : 20 }}>
                <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 20 }}>{getTitle()}</Text>
                {subTitle && (
                  <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 12, marginTop: 5 }}>{subTitle}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
          {renderUserInput()}
        </Dialog>
      </Portal>
    </>
  );
};

export default ReportDialog;
