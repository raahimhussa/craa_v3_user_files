import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Snackbar,
  Stack,
} from '@mui/material';
import { Close, RunCircleTwoTone } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { green, grey, red } from '@mui/material/colors';
import { observer, useLocalObservable } from 'mobx-react';

import { AssessmentCycle } from 'src/models/assessmentCycle';
import AssessmentType from 'src/models/assessmentType';
import { BaselineStatus } from 'src/models/userSimulation/types';
import { BusinessCycle } from 'src/models/clientUnit/clientUnit.interface';
import Typography from '../Typography/Typography';
import UserAssessmentCycle from 'src/models/userAssessmentCycle';
import UserSimulation from 'src/models/userSimulation';
import { Utils } from '@utils';
import _ from 'lodash';
import customTheme from 'src/ui/theme/customizedTheme';
import moment from 'moment';
import { useRootStore } from 'src/stores';
import Swal, { SweetAlertResult } from 'sweetalert2';

function SimulationCardView({
  businessCycle,
  assessmentType,
  userSimulation,
  userSimulationMutate,
}: {
  businessCycle: BusinessCycle;
  assessmentType: AssessmentType;
  userSimulation: UserSimulation;
  userSimulationMutate: any;
  // userSimulationMutate: () => void;
}) {
  const {
    routerStore,
    screenRecorderStore: { controlButton },
    viewportStore,
    uiState,
    authStore,
    userSimulationStore,
    simulationStore,
  } = useRootStore();
  useEffect(() => {
    // uiState.userSimulation.mutate = userSimulationMutate;
    // uiState.userSimulation.mutate = userSimulation.mutate;
  }, [userSimulation]);
  console.log({ businessCycle });
  const localState: any = useLocalObservable(() => ({
    open: false,
    message: '',
    severity: 'error',
    vertical: 'top',
    horizontal: 'center',
  }));
  //@ts-ignore
  const startTime = new Date(businessCycle?.startDate || undefined).getTime();
  const currentTime = new Date().getTime();
  //@ts-ignore
  const endTime = new Date(businessCycle?.endDate || undefined).getTime();
  const startDate =
    userSimulationStore.userSimulations[userSimulation._id]?.startedAt !== null
      ? moment(
          userSimulationStore.userSimulations[userSimulation._id]?.startedAt
        ).format('Y MM/DD')
      : '--';
  const endDate = moment(businessCycle?.endDate).format('Y MM/DD');
  const button = {
    text: 'Start',
    disabled: false,
    onClick: async () => {
      // if (userSimulation?.status != status) {
      //   alert('This Simulation has been submitted.');
      //   window.location.reload();
      //   return;
      // }
      userSimulationStore.userSimulation =
        userSimulationStore.userSimulations[userSimulation._id];
      if (
        userSimulationStore.userSimulations[userSimulation._id].status ===
        BaselineStatus.Complete
      ) {
        localState.open = true;
        localState.severity = 'success';
        localState.message = 'you have already completed';
        return null;
      }
      if (
        userSimulationStore.userSimulations[userSimulation._id].attemptCount! <=
        0
      ) {
        localState.open = true;
        localState.severity = 'error';
        localState.message =
          'No chance to try.(Number of sessions remaining:0)';
        return null;
      }
      controlButton.isVisible = true;
      if (!userSimulationStore.userSimulations[userSimulation._id].isAgreed) {
        const { data } = await simulationStore.simulationRepository.find({
          filter: {
            _id: userSimulationStore.userSimulations[userSimulation._id]
              .simulationId,
          },
          options: {
            multi: false,
          },
        });
        //@ts-ignore
        let agreement: string = data.agreement.htmlContent;
        agreement = agreement.replace('{UserName}', authStore.user.name);
        agreement = agreement.replace('{UserEmail}', authStore.user.email);
        agreement = agreement.replace(
          '{UserFirstName}',
          authStore.user.profile?.firstName
        );
        agreement = agreement.replace(
          '{UserLastName}',
          authStore.user.profile?.lastName
        );
        const result: SweetAlertResult<any> = await Swal.fire({
          width: 780,
          title: 'Agreement',
          html: agreement,
          confirmButtonText: 'AGREE',
          cancelButtonText: 'DISAGREE',
          showCancelButton: true,
          confirmButtonColor: green[500],
          backdrop:
            'linear-gradient(90deg, #377485 0%, #5B97A8 50.52%, #0A304D 100%)',
        });
        if (!result.isConfirmed) {
          return;
        } else {
          userSimulationStore.userSimulations[userSimulation._id].updateAgreed(
            true
          );
        }
      }
      routerStore.go({
        pathname: 'baseline',
        query: {
          userSimulationId: userSimulation?._id,
          isScreenRecord: businessCycle.isScreenRecordingOn,
        },
      });
    },
  };
  const isNotYetStartDay = startTime > currentTime;
  const isInRunning = currentTime < endTime;
  const isTimeout = currentTime > endTime;

  if (isNotYetStartDay) {
    button.text = 'Start - ' + startDate;
    button.disabled = true;
  } else if (isInRunning) {
    button.text =
      userSimulationStore.userSimulations[userSimulation._id]?.status ===
      BaselineStatus.Assigned
        ? 'Start'
        : 'Continue';
    button.disabled = false;
  } else if (isTimeout) {
    button.text = 'Timeout - expired At ' + endDate;
    button.disabled = true;
  }

  // const usageTime = Utils.convert(userSimulation?.usageTime!, 'astr');
  const testTime = Utils.convert(
    userSimulationStore.userSimulations[userSimulation._id]?.testTime!,
    'astr'
  );

  let isInstructionViewed =
    assessmentType.baseline?.instructionIds.length !==
    userSimulationStore.userSimulations[userSimulation._id]?.instructions
      ?.length
      ? false
      : _.every(userSimulation?.instructions, 'isViewed');
  let isProtocolViewed =
    assessmentType.baseline?.protocolIds.length !==
    userSimulationStore.userSimulations[userSimulation._id]?.protocols?.length
      ? false
      : _.every(userSimulation?.protocols, 'isViewed');
  let isStudyDocViewed =
    assessmentType.baseline?.studyLogIds.length !==
    userSimulationStore.userSimulations[userSimulation._id]?.studyLogs?.length
      ? false
      : _.every(
          userSimulationStore.userSimulations[userSimulation._id]?.studyLogs,
          'isViewed'
        );

  if (
    isInstructionViewed == false ||
    isProtocolViewed == false ||
    isStudyDocViewed == false
  ) {
    button.disabled = true;
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    localState.open = false;
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Confirm
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={localState.open}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity={localState.severity}
          sx={{ width: '100%' }}
        >
          {localState.message}
        </Alert>
      </Snackbar>
      {/* <Header /> */}
      <Grid container spacing={2}>
        <Grid item xs={4} className="date">
          {/* <Card
            sx={{
              borderRadius: '10px',
              minHeight: '120px',
            }}
          >
            <CardHeader title="Date Info" sx={{ pb: 0 }} />
            <CardContent> */}
          <Box
            sx={{
              border: '1px solid black',
              borderColor: customTheme.craa?.palette.lightborder,
              borderBottom: 'none',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '14.5px',
                py: '3.2px',
                px: '8px',
              }}
            >
              Date Info
            </Typography>
          </Box>
          <Alert
            severity="info"
            sx={{
              minHeight: '70px',
              borderRadius: '10px',
              px: 1,
              // border: '1px solid black',
              // borderColor: customTheme.craa?.palette.blue,
              // color: customTheme.craa?.palette.darkfont,
            }}
            icon={false}
          >
            {/* <AlertTitle sx={{}} >Date Info</AlertTitle> */}
            <div style={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  width: '112px',
                  textAlign: 'right',
                  mr: 1,
                }}
              >
                Start Date
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                {userSimulationStore.userSimulations[userSimulation._id]
                  ?.startedAt !== null
                  ? moment(
                      userSimulationStore.userSimulations[userSimulation._id]
                        ?.startedAt
                    ).format('Y MM/DD')
                  : '--'}
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  width: '112px',
                  textAlign: 'right',
                  mr: 1,
                }}
              >
                Submitted Date
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                
              </Typography>
            </div>
          </Alert>
          {/* </CardContent>
          </Card> */}
        </Grid>
        <Grid item xs={4} className="time">
          {/* <Card
            sx={{
              borderRadius: '10px',
              minHeight: '148px',
            }}
          >
            <CardHeader title="Time Info" sx={{ pb: 0 }} />
            <CardContent> */}
          <Box
            sx={{
              border: '1px solid black',
              borderColor: customTheme.craa?.palette.lightborder,
              borderBottom: 'none',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '14.5px',
                py: '3.2px',
                px: '8px',
              }}
            >
              Time Info
            </Typography>
          </Box>
          <Alert
            severity="info"
            sx={{
              minHeight: '70px',
              borderRadius: '10px',
              px: 1,
              // border: '1px solid rgb(213,219,219)',
              // borderColor: customTheme.craa?.palette.blue,
              // color: customTheme.craa?.palette.darkfont,
              // bgcolor: 'white',
            }}
            icon={false}
          >
            <div style={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  width: '105px',
                  textAlign: 'right',
                  mr: 1,
                }}
              >
                Allocated Time
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                {testTime.hours < 10 ? '0' + testTime.hours : testTime.hours}:
                {testTime.minutes < 10
                  ? '0' + testTime.minutes
                  : testTime.minutes}
                :
                {testTime.seconds < 10
                  ? '0' + testTime.seconds
                  : testTime.seconds}
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  width: '105px',
                  textAlign: 'right',
                  mr: 1,
                }}
              >
                Time Spent
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                {Utils.convert(
                  userSimulationStore.userSimulations[userSimulation._id]
                    ?.usageTime!,
                  'astr'
                ).hours < 10
                  ? '0' +
                    Utils.convert(
                      userSimulationStore.userSimulations[userSimulation._id]
                        ?.usageTime!,
                      'astr'
                    ).hours
                  : Utils.convert(
                      userSimulationStore.userSimulations[userSimulation._id]
                        ?.usageTime!,
                      'astr'
                    ).hours}
                :
                {Utils.convert(
                  userSimulationStore.userSimulations[userSimulation._id]
                    ?.usageTime!,
                  'astr'
                ).minutes < 10
                  ? '0' +
                    Utils.convert(
                      userSimulationStore.userSimulations[userSimulation._id]
                        ?.usageTime!,
                      'astr'
                    ).minutes
                  : Utils.convert(
                      userSimulationStore.userSimulations[userSimulation._id]
                        ?.usageTime!,
                      'astr'
                    ).minutes}
                :
                {Utils.convert(
                  userSimulationStore.userSimulations[userSimulation._id]
                    ?.usageTime!,
                  'astr'
                ).seconds < 10
                  ? '0' +
                    Utils.convert(
                      userSimulationStore.userSimulations[userSimulation._id]
                        ?.usageTime!,
                      'astr'
                    ).seconds
                  : Utils.convert(
                      userSimulationStore.userSimulations[userSimulation._id]
                        ?.usageTime!,
                      'astr'
                    ).seconds}
              </Typography>
            </div>
          </Alert>
          {/* </CardContent>
          </Card> */}
        </Grid>
        <Grid item xs={4} className="status">
          {/* <Card
            sx={{
              borderRadius: '10px',
              minHeight: '148px',
            }}
          >
            <CardHeader title="Status" sx={{ pb: 0 }} />
            <CardContent> */}
          <Box
            sx={{
              border: '1px solid black',
              borderColor: customTheme.craa?.palette.lightborder,
              borderBottom: 'none',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '14.5px',
                py: '3.2px',
                px: '8px',
              }}
            >
              Status
            </Typography>
          </Box>
          <Alert
            severity="success"
            sx={{
              minHeight: '70px',
              borderRadius: '10px',
              // border: '1px solid black',
              // borderColor: customTheme.craa?.palette.green,
              display: 'flex',
              alignItems: 'center',
            }}
            icon={false}
          >
            <AlertTitle
              sx={{
                fontSize: '0.9rem',
                fontWeight: 600,
                mb: 0,
              }}
            >
              {_.upperCase(
                userSimulationStore.userSimulations[userSimulation._id]?.status
              )}
            </AlertTitle>
          </Alert>
          {/* </CardContent>
          </Card> */}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <Box
          className="count"
          component={'span'}
          sx={{
            fontWeight: 600,
            color:
              userSimulation?.attemptCount! <= 0
                ? customTheme.craa?.palette.red
                : customTheme.craa?.palette.green,
            fontSize: '15px',
          }}
        >
          {`Number of sessions remaining : ${
            userSimulationStore.userSimulations[userSimulation._id]
              ?.attemptCount
          }`}
        </Box>
        <Button
          className="start"
          disabled={button.disabled}
          onClick={button.onClick}
          variant="contained"
          sx={{
            // mt: 1,
            borderRadius: '2px',
            bgcolor: customTheme.craa?.palette.dark,
            color: 'white',
            boxShadow: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            py: 0.4,
            px: 3,
            '&:hover': {
              // bgcolor: '#00cc66',
              color: 'white !important',
              boxShadow: 'none',
            },
          }}
        >
          {button.text}
        </Button>
      </Box>
      <Stack spacing={2} sx={{}}>
        {/* {!isInstructionViewed && (
          <Alert
            severity="warning"
            sx={{
              borderRadius: '10px',
              mt: 1,
            }}
          >
            You should see the instruction.
          </Alert>
        )}
        {!isProtocolViewed && (
          <Alert
            severity="warning"
            sx={{
              borderRadius: '10px',
              mt: 1,
            }}
          >
            You should see the protocol.
          </Alert>
        )}
        {!isStudyDocViewed && (
          <Alert
            severity="warning"
            sx={{
              borderRadius: '10px',
              mt: 1,
            }}
          >
            You should see the studyDocument.
          </Alert>
        )} */}
      </Stack>
    </Box>
  );
}
export default observer(SimulationCardView);

const Header = observer(() => {
  return (
    <Box
      sx={{
        bgcolor: grey[100],
        width: 1,
        display: 'flex',
        lineHeight: 2,
        fontWeight: 500,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '9px',
        mb: 1,
      }}
    >
      Simulation
      <RunCircleTwoTone
        sx={{
          ml: 1,
        }}
        htmlColor={green[300]}
      />
    </Box>
  );
});
