import { AssessmentCycle } from 'src/models/assessmentCycle';
import AssessmentType from 'src/models/assessmentType';
import Box from '@mui/material/Box';
import Header from './Header/Header';
import Instructions from '../Instructions/Instructions';
import { Alert, Paper } from '@mui/material';
import Protocols from '../Protocols/Protocols';
import SimulationCard from '../SimulationCard/SimulationCard';
import StudyDocs from '../StudyDocs/StudyDocs';
import Typography from '../Typography/Typography';
import UserAssessmentCycle from 'src/models/userAssessmentCycle';
import UserSimulation from 'src/models/userSimulation';
import customTheme from 'src/ui/theme/customizedTheme';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';
import ProductTour from '../ProductTour/ProductTour';
import _ from 'lodash';
import { Warning } from '@mui/icons-material';

function BaselineCardView(props: any) {
  const {
    userAssessmentCycle,
    assessmentType,
    userSimulation,
    userSimulationMutate,
    setOpenTour,
    openTour,
  }: {
    userAssessmentCycle: UserAssessmentCycle;
    assessmentType: AssessmentType;
    userSimulation: UserSimulation;
    userSimulationMutate: any;
    setOpenTour: any;
    openTour: any;
  } = props;
  const {
    uiState: { baselineCard },
    userAssessmentCycleStore,
    userSimulationStore,
  } = useRootStore();

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

  // useEffect(() => {
  //   // baselineCard.mutate = userSimulationMutate;
  //   console.log(userSimulationMutate);
  //   userSimulationStore.userSimulation?.mutate &&
  //     userSimulationStore.userSimulation?.mutate();
  // }, []);

  return (
    <Box sx={{}}>
      {/* <ProductTour
        type="baseline"
        setOpenTour={setOpenTour}
        openTour={openTour}
      /> */}
      {/* <Header /> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
          mb: 2,
          // height: '50px',
        }}
      >
        <Paper
          className="instruction"
          sx={{
            width: '32.7%',
            borderRadius: '6px !important',
            pb: 1,
            position: 'relative',
          }}
        >
          {!isInstructionViewed ? (
            <Box
              sx={{
                width: '100%',
                position: 'absolute',
                bgcolor: 'rgb(255, 204, 0,0.3)',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Warning sx={{ color: '#ff9800', fontSize: 40 }} />
            </Box>
          ) : (
            <></>
          )}
          <Box
            sx={{
              // bgcolor: 'rgb(241,250,255) !important',
              pl: 1,
              py: 0.4,
              mb: 1,
              borderBottom: '1px solid black',
              borderColor: customTheme.craa?.palette.lightborder,
            }}
          >
            <Typography
              sx={{
                color: customTheme.craa?.palette.darkfont,
                fontWeight: 700,
                fontSize: '14.5px',
              }}
            >
              Instructions
            </Typography>
          </Box>
          <Instructions
            userSimulationMutate={userSimulationMutate}
            userSimulation={userSimulation}
            instructionIds={assessmentType?.baseline?.instructionIds}
          />
        </Paper>
        {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
        <Paper
          className="protocol"
          sx={{
            width: '32.7%',
            borderRadius: '2px',
            pb: 1,
            position: 'relative',
          }}
        >
          {!isProtocolViewed ? (
            <Box
              sx={{
                width: '100%',
                position: 'absolute',
                bgcolor: 'rgb(255, 204, 0,0.3)',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Warning sx={{ color: '#ff9800', fontSize: 40 }} />
            </Box>
          ) : (
            <></>
          )}
          <Box
            sx={{
              // bgcolor: 'rgb(241,250,255) !important',
              pl: 1,
              py: 0.4,
              mb: 1,
              borderBottom: '1px solid black',
              borderColor: customTheme.craa?.palette.lightborder,
            }}
          >
            <Typography
              sx={{
                color: customTheme.craa?.palette.darkfont,
                fontWeight: 700,
                fontSize: '14.5px',
              }}
            >
              Protocols
            </Typography>
          </Box>
          <Protocols
            userSimulationMutate={userSimulationMutate}
            b
            userSimulation={userSimulation}
            protocolIds={assessmentType?.baseline?.protocolIds}
          />
        </Paper>
        {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
        <Paper
          className="studydoc"
          sx={{
            width: '32.7%',
            borderRadius: '2px',
            pb: 1,
            position: 'relative',
          }}
        >
          {!isStudyDocViewed ? (
            <Box
              sx={{
                width: '100%',
                position: 'absolute',
                bgcolor: 'rgb(255, 204, 0,0.3)',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Warning sx={{ color: '#ff9800', fontSize: 40 }} />
            </Box>
          ) : (
            <></>
          )}
          <Box
            sx={{
              // bgcolor: 'rgb(241,250,255) !important',
              pl: 1,
              py: 0.4,
              mb: 1,
              borderBottom: '1px solid black',
              borderColor: customTheme.craa?.palette.lightborder,
            }}
          >
            <Typography
              sx={{
                color: customTheme.craa?.palette.darkfont,
                fontWeight: 700,
                fontSize: '14.5px',
              }}
            >
              Study Documents
            </Typography>
          </Box>
          <StudyDocs
            userSimulationMutate={userSimulationMutate}
            userSimulation={userSimulation}
            studyDocIds={assessmentType?.baseline?.studyLogIds}
          />
        </Paper>
      </Box>
      <SimulationCard
        assessmentType={assessmentType}
        userAssessmentCycle={userAssessmentCycle}
        userSimulation={userSimulation}
        userSimulationMutate={userSimulationMutate}
      />
    </Box>
  );
}
export default observer(BaselineCardView);
