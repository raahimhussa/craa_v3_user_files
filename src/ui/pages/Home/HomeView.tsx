import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  AppBar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Modal,
  Paper,
  Popover,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import {
  BaselineStatus,
  SimulationType,
} from 'src/models/userSimulation/types';
import {
  ExpandMore,
  RunCircle,
  VideoLibrary,
  Warning,
} from '@mui/icons-material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { LogScreen, SimEvent } from 'src/models/log/types';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { green, grey, yellow } from '@mui/material/colors';
import { observer, useLocalObservable } from 'mobx-react';
import { useEffect, useState } from 'react';

import { ATFollowup } from 'src/models/assessmentType/types';
import { AnyARecord } from 'dns';
import BaselineCard from 'src/ui/components/BaselineCard/BaselineCard';
import { BusinessCycle } from 'src/models/clientUnit/clientUnit.interface';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image';
import Instructions from 'src/ui/components/Instructions/Instructions';
import { KeyedMutator } from 'swr';
import Placeholder from 'src/ui/components/Placeholder/Placeholder';
import PortalCard from 'src/ui/components/Header/PortalCard/PortalCard';
import Preview from './Preview';
import ProductTour from 'src/ui/components/ProductTour/ProductTour';
import ProfileCard from 'src/ui/components/Header/ProfileCard/ProfileCard';
import Protocols from 'src/ui/components/Protocols/Protocols';
import Simulation from 'src/models/simulation';
import StudyDocs from 'src/ui/components/StudyDocs/StudyDocs';
import TourIcon from '@mui/icons-material/Tour';
import UAC from 'src/models/userAssessmentCycle';
import UserAssessmentCycleStore from 'src/stores/userAssessmentCycleStore';
import UserSimulation from 'src/models/userSimulation';
import { Utils } from '@utils';
import _ from 'lodash';
import axios from 'axios';
import compose from '@shopify/react-compose';
import customTheme from 'src/ui/theme/customizedTheme';
import { fontWeight } from '@mui/system';
import logoImg from 'public/logo/logo_full.png';
import moment from 'moment';
import uniqid from 'uniqid';
import { useRootStore } from 'src/stores';
import { withFindOne } from '@hocs';
import withREST from 'src/hocs/withREST';
import withStore from 'src/hocs/withStore';

function HomeView({ matchMutate }: any, props: any) {
  const {
    uiState,
    modalStore,
    userSimulationStore,
    userAssessmentCycleStore,
    screenRecorderStore,
    logStore,
  } = useRootStore();
  // const { userSimulation } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userAssessmentCycles = userAssessmentCycleStore.userAssessmentCycles;
  const [openTour, setOpenTour] = useState(false);
  const { userSimulation } = userSimulationStore;
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(
      !screenRecorderStore.isScreenrecording && !screenRecorderStore.isLegal
      // !screenRecorderStore.isLegal
    );
  }, [screenRecorderStore.isScreenrecording, screenRecorderStore.isLegal]);

  const onClickVideo = (e: any, type: string, index: number) => {
    e.stopPropagation();
    modalStore.tutorialType = type;
    modalStore.video.isVisible = true;
    modalStore.uacIndex = index;
    if (type === 'baseline') {
      logStore.create(SimEvent.onClickSimTutorial, LogScreen.AssessmentCycle);
    } else {
      logStore.create(
        SimEvent.onClickTrainingTutorial,
        LogScreen.AssessmentCycle
      );
    }
  };
  const onClickTour = (e: any, type: string) => {
    e.stopPropagation();
    modalStore.tourType = type;
    modalStore.tour.isVisible = true;
  };

  // if (userSimulation?.simulationType === SimulationType.Baseline) {
  //   userSimulationStore.baselineStatus = userSimulation.status;
  // }

  const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    // background: 'linear-gradient(135deg,#53aca9,#377270 25%,#377270)',
    background: theme.craa?.palette.header,
    [theme.breakpoints.up('md')]: {
      // alignItems: 'flex-start',
      padding: theme.spacing(1.4, 2, 1.4, 2),
    },
  }));

  const placeholder = (
    <Placeholder text="There are no assessmentCycle available." />
  );

  return (
    <Box>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          screenRecorderStore.isScreenrecording = true;
          screenRecorderStore.isLegal = false;
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'You have stopped the screen recording.'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Since we detected a change from your window, you couldn't continue
            the simulation and still your session count has decreased. Please
            restart the simulation but this time don't trigger any changes on
            your window.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              screenRecorderStore.isScreenrecording = true;
              screenRecorderStore.isLegal = true;
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <HeaderStyle>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link href={'/home'}>
            <a>
              <Image src={logoImg} width="25px" height="25px" />
            </a>
          </Link>
        </div>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Button
            onClick={handleClick}
            sx={{
              p: '0 !important',
              minWidth: '25px',
              mr: 1,
            }}
          >
            <TourIcon
              sx={{
                color: customTheme.craa?.palette.main,
                fontSize: '20px',
                mr: 2,
              }}
            />
          </Button>
          <Popover
            id="basic-menu"
            className="popover"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(e) => {
                onClickTour(e, 'baseline');
              }}
              sx={{ bgcolor: 'white' }}
            >
              Baseline
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                onClickTour(e, 'training');
              }}
              sx={{ bgcolor: 'white' }}
            >
              Training
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                onClickTour(e, 'viewport');
              }}
              sx={{ bgcolor: 'white' }}
            >
              Simulation
            </MenuItem>
          </Popover>
          <PortalCard />
          <ProfileCard />
        </Box>
      </HeaderStyle>
      <Grid
        container
        spacing={2}
        sx={{
          px: 5,
          py: 2,
          height: uiState.windowDimensions?.height! - 60,
          overflowY: 'scroll !important',
          mt: 0.5,
        }}
      >
        <Grid
          item
          xs={12}
          sx={
            {
              // height: uiState.windowDimensions?.height! - 56,
              // overflow: 'scroll',
            }
          }
        >
          {userAssessmentCycles.length === 0
            ? placeholder
            : userAssessmentCycles?.map((uac: UAC, index: number) => {
                return (
                  <Accordion
                    key={uniqid()}
                    expanded={true}
                    className="paper-grid"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore fontSize="large" />}
                      onClick={() => {
                        uac.toggle();
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {
                          userAssessmentCycleStore.userAssessmentCycles[index]
                            .isOpen
                        }
                        <RunCircle
                          fontSize="large"
                          sx={{
                            mr: 1,
                            fontSize: '1.9rem',
                            color: (theme) => theme.craa?.palette.blue,
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.3rem',
                            color: (theme) => theme.craa?.palette.darkfont,
                            mr: 3,
                          }}
                        >
                          {`AssessmentCycle - ${index + 1}`}
                        </Typography>
                        <IconButton
                          onClick={(event) =>
                            onClickVideo(event, 'baseline', index)
                          }
                          sx={{
                            color: (theme) => theme.craa?.palette.blue,
                            fontSize: '0.3rem',
                            fontWeight: 700,
                            py: '0.3rem',
                            '&:hover': {
                              bgcolor: 'transparent',
                              color: 'rgb(84, 91, 100) !important',
                            },
                          }}
                        >
                          <Tooltip title="Tutorial Video">
                            <VideoLibrary
                              sx={{ fontSize: '1.1rem', mr: '0.3rem' }}
                            />
                          </Tooltip>
                          <Typography
                            variant="button"
                            sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                          >
                            Watch Simulation Tutorial
                          </Typography>
                        </IconButton>
                        {/* <Chip
                          sx={{
                            fontWeight: 500,
                            ml: 2,
                          }}
                          label={`Due Date : ${moment(
                            uac.clientUnit.businessUnits[0].businessCycles[0]
                              .endDate
                          ).format('Y MM/DD HH:mm')}`}
                        /> */}
                        <Box>
                          <Typography>{}</Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {!uac.isSimTutorialViewed && (
                        <Alert
                          severity="warning"
                          sx={{
                            borderRadius: '10px',
                            mb: 1,
                          }}
                        >
                          You should watch the simulation tutorial.
                        </Alert>
                      )}
                      <Accordion
                        defaultExpanded={uac.isSimTutorialViewed || uac.bypass}
                        disabled={!uac.isSimTutorialViewed && !uac.bypass}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            display: 'flex',
                            bgcolor: 'rgb(250,250,250)',
                            borderBottom: '1px solid black',
                            borderColor: (theme) =>
                              theme.craa?.palette.lightborder,
                            // boxShadow:
                            //   'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                            px: 2.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: '1.2rem',
                              color: (theme) => theme.craa?.palette.darkfont,
                            }}
                          >
                            Baseline
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {userSimulationStore.userSimulations[
                            uac.userBaselineId
                          ]?.status === BaselineStatus.HasNotAssigned ? (
                            <Alert severity="error">
                              No baseline assigned.
                            </Alert>
                          ) : userSimulationStore.userSimulations[
                              uac.userBaselineId
                            ]?.status == BaselineStatus.Scoring ||
                            userSimulationStore.userSimulations[
                              uac.userBaselineId
                            ]?.status == BaselineStatus.Adjudicating ||
                            userSimulationStore.userSimulations[
                              uac.userBaselineId
                            ]?.status == BaselineStatus.Published ||
                            userSimulationStore.userSimulations[
                              uac.userBaselineId
                            ]?.status == BaselineStatus.Distributed ||
                            userSimulationStore.userSimulations[
                              uac.userBaselineId
                            ]?.status == BaselineStatus.Review ||
                            userSimulationStore.userSimulations[
                              uac.userBaselineId
                            ]?.status == BaselineStatus.Exported ? (
                            <Baseline userSimulationId={uac.userBaselineId} />
                          ) : (
                            <BaselineCard
                              openTour={openTour}
                              setOpenTour={setOpenTour}
                              userSimulationId={uac.userBaselineId}
                              assessmentTypeId={uac.assessmentTypeId}
                              userAssessmentCycle={uac}
                            />
                          )}
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        disabled={
                          userSimulationStore.userSimulations[
                            uac.userBaselineId
                          ]?.status !==
                            (BaselineStatus.Distributed as BaselineStatus) &&
                          !uac.bypass
                        }
                        defaultExpanded={
                          userSimulationStore.userSimulations[
                            uac.userBaselineId
                          ]?.status ==
                            (BaselineStatus.Distributed as BaselineStatus) ||
                          uac.bypass
                        }
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            display: 'flex',
                            bgcolor: 'rgb(250,250,250)',
                            borderBottom: '1px solid black',
                            borderColor: (theme) =>
                              theme.craa?.palette.lightborder,
                            // boxShadow:
                            //   'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                            px: 2.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: '1.2rem',
                              color: (theme) => theme.craa?.palette.darkfont,
                            }}
                          >
                            Trainings & Followups
                          </Typography>
                          <IconButton
                            onClick={(event) =>
                              onClickVideo(event, 'training', index)
                            }
                            sx={{
                              color: (theme) => theme.craa?.palette.blue,
                              fontSize: '0.3rem',
                              fontWeight: 700,
                              py: '0.3rem',
                              ml: 1,
                              mt: -0.3,
                              '&:hover': {
                                bgcolor: 'transparent',
                                color: 'rgb(84, 91, 100) !important',
                              },
                            }}
                          >
                            <Tooltip title="Tutorial Video">
                              <VideoLibrary
                                sx={{ fontSize: '1.1rem', mr: '0.3rem' }}
                              />
                            </Tooltip>
                            <Typography
                              variant="button"
                              sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                            >
                              Watch Training Tutorial
                            </Typography>
                          </IconButton>
                        </AccordionSummary>
                        <AccordionDetails>
                          {!uac.isTrainingTutorialViewed && (
                            <Alert
                              severity="warning"
                              sx={{
                                borderRadius: '10px',
                                mb: 1,
                              }}
                            >
                              You should watch the training tutorial.
                            </Alert>
                          )}
                          <Trainings
                            openTour={openTour}
                            setOpenTour={setOpenTour}
                            selectedUACIndex={index}
                            disabled={!uac.isTrainingTutorialViewed}
                            userAssessmentCycleStore={userAssessmentCycleStore}
                          />
                        </AccordionDetails>
                      </Accordion>
                      {/* <Accordion
                        className="followup"
                        disabled={
                          userSimulationStore.baselineStatus !==
                            (BaselineStatus.Distributed as BaselineStatus) ||
                          !uac.isTrainingTutorialViewed
                        }
                        defaultExpanded={
                          userSimulationStore.baselineStatus ==
                            (BaselineStatus.Distributed as BaselineStatus) &&
                          uac.isTrainingTutorialViewed
                        }
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            display: 'flex',
                            bgcolor: 'rgb(250,250,250)',
                            borderBottom: '1px solid black',
                            borderColor: (theme) =>
                              theme.craa?.palette.lightborder,
                            // boxShadow:
                            //   'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                            px: 2.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: '1.2rem',
                              color: (theme) => theme.craa?.palette.darkfont,
                            }}
                          >
                            Followups
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Followups selectedUACIndex={index} />
                        </AccordionDetails>
                      </Accordion> */}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default observer(HomeView);

const BaselineView = observer((props: any) => {
  const { userSimulation, userSimulationId } = props;
  const [openPreview, setOpenPreview] = useState(false);
  const { userSimulationStore } = useRootStore();
  const _id = userSimulationId;

  const onClickPreview = async () => {
    setOpenPreview(true);
  };

  const onClickClose = () => {
    setOpenPreview(false);
  };
  return (
    <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 1 }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2} direction={'row'}>
          <Chip
            size="medium"
            variant="outlined"
            label={
              'Status : ' +
              _.upperFirst(userSimulationStore.userSimulations[_id].status)
            }
            sx={{
              borderRadius: '4px',
              fontWeight: 500,
              fontSize: '14px',
              color: customTheme.craa?.palette.green,
              borderColor: customTheme.craa?.palette.green,
              py: 2,
            }}
          />
          <Chip
            size="medium"
            variant="outlined"
            color="info"
            label={` Submitted On : 
            ${
              userSimulationStore.userSimulations[_id]?.submittedAt !== null
                ? moment(
                    userSimulationStore.userSimulations[_id].submittedAt!
                  ).format('yyyy MM/DD')
                : '--'
            }`}
            sx={{
              borderRadius: '4px',
              fontWeight: 500,
              fontSize: '14px',
              color: customTheme.craa?.palette.blue,
              borderColor: customTheme.craa?.palette.blue,
              py: 2,
            }}
          />
          {userSimulation?.status ===
          (BaselineStatus.Distributed as BaselineStatus) ? (
            <Chip
              size="medium"
              variant="outlined"
              color="info"
              label={` Distributed Date : 
            ${
              userSimulationStore.userSimulations[_id]?.distributedAt !== null
                ? moment(
                    userSimulationStore.userSimulations[_id]?.distributedAt!
                  ).format('yyyy-MM-DD')
                : '--'
            }`}
              sx={{
                borderRadius: '4px',
                fontWeight: 500,
                fontSize: '14px',
                color: customTheme.craa?.palette.blue,
                borderColor: customTheme.craa?.palette.blue,
                py: 2,
              }}
            />
          ) : (
            <></>
          )}
        </Stack>
        <Button
          component="div"
          variant="contained"
          disabled={
            userSimulationStore.userSimulations[_id]?.status !=
            (BaselineStatus.Distributed as BaselineStatus)
          }
          sx={{
            // borderRadius: '4px',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            boxShadow: 'none',
          }}
          onClick={onClickPreview}
        >
          View Results
        </Button>
        <Modal open={openPreview} onClose={onClickClose}>
          <Box sx={{ maxHeight: '100vh' }}>
            <AppBar position="static">
              <Toolbar
                sx={{
                  minHeight: '40px !important',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  pr: '0.5rem !important',
                }}
              >
                <Button
                  onClick={onClickClose}
                  color="inherit"
                  sx={{
                    fontWeight: 700,
                    '&:hover': {
                      color: 'white !important',
                    },
                  }}
                >
                  Close
                </Button>
              </Toolbar>
            </AppBar>
            <Preview
              userSimulationId={userSimulationStore.userSimulations[_id]._id}
              simId={userSimulationStore.userSimulations[_id].simulationId}
              setOpenPreview={setOpenPreview}
            />
          </Box>
        </Modal>
      </Box>
    </Card>
  );
});
const Baseline = compose<any>(
  withFindOne({
    collectionName: 'userSimulations',
    getFilter: (props: any) => ({
      _id: props.userSimulationId,
    }),
    version: 2,
  })
)(BaselineView);

type TrainingsProps = {
  selectedUACIndex: number;
  disabled: boolean;
  openTour: any;
  setOpenTour: any;
  userAssessmentCycleStore: UserAssessmentCycleStore;
};

const TrainingsView = observer((props: TrainingsProps) => {
  const { selectedUACIndex, disabled, openTour, setOpenTour } = props;

  const {
    assessmentTypeStore: { assessmentType },
    userAssessmentCycleStore: { userAssessmentCycles },
    userAssessmentCycleStore,
    userSimulationStore,
  } = useRootStore();

  const userAssessmentCycle = userAssessmentCycles[selectedUACIndex];
  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      {userAssessmentCycle.userTrainingIds.map(
        (userTrainingId: any, index: any) => {
          const { userFollowupIds } = userAssessmentCycle;
          return (
            <Box
              key={index}
              sx={
                {
                  // border: '1px solid #bfbfbf',
                  // mb: '1rem !important',
                }
              }
            >
              <Training
                userAssessmentCycle={userAssessmentCycle}
                key={userTrainingId}
                userTrainingId={userTrainingId}
                disabled={disabled}
                trainingId={assessmentType?.trainings[index]._id}
              />
              <Followup
                key={uniqid()}
                userAssessmentCycle={userAssessmentCycle}
                testTime={assessmentType?.followups[index].testTime}
                assessmentTypeId={assessmentType?._id}
                simulationId={assessmentType?.followups[index].simulationId}
                userSimulationIds={userFollowupIds}
                domainId={assessmentType?.followups[index].domain._id}
                followup={assessmentType?.followups[index]}
              />
            </Box>
          );
        }
      )}
    </Stack>
  );
});

type TrainingProps = {
  userTrainingId: string;
  userTraining: any;
  domain: any;
  disabled: boolean;
  userAssessmentCycle: any;
  selectedUACIndex: number;
  userAssessmentCycleStore: any;
  trainingId: any;
  training: any;
};

const TrainingView = observer((props: TrainingProps) => {
  const { userTraining, domain, disabled, userAssessmentCycle, training } =
    props;
  const {
    assessmentTypeStore: { assessmentType },
    userAssessmentCycleStore,
    userSimulationStore,
  } = useRootStore();
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    let sum = 0;
    Object.values(training?.pages || {}).map((value: any) => {
      sum += value.duration;
    });
    setDuration(sum);
  }, []);

  let pageKeys: any = [];
  if (userTraining?.progresses !== undefined) {
    pageKeys = Object.keys(userTraining?.progresses);
  }
  let completePages = 0;
  let totalPages = pageKeys.length;
  pageKeys.map((key: any) => {
    if (userTraining.progresses[key].status === BaselineStatus.Complete) {
      completePages++;
    }
  });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    width: '300px',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: 'rgb(0, 115, 187,0.7)',
    },
  }));

  if (userTraining.status === BaselineStatus.InProgress) {
    userAssessmentCycleStore.inprogressTraining = userTraining.domainId;
  } else if (userTraining.status === BaselineStatus.Complete) {
    userAssessmentCycleStore.completeTrainings.push(userTraining.domainId);
  }
  if (userTraining != '') {
    return (
      <Accordion
        disabled={
          ((userTraining.status !== BaselineStatus.Complete &&
            userTraining.status !== BaselineStatus.InProgress &&
            userTraining.domainId !== userAssessmentCycleStore.openFollowup &&
            userAssessmentCycleStore.openFollowup !== '') ||
            (userAssessmentCycleStore.inprogressTraining !== '' &&
              userTraining.status !== BaselineStatus.InProgress &&
              userTraining.status !== BaselineStatus.Complete) ||
            disabled) &&
          !userAssessmentCycle.bypass
        }
        sx={{
          bgcolor:
            userTraining.status === BaselineStatus.Complete
              ? 'rgb(242, 242, 242,0.6)'
              : 'white',
          border: '1px solid #bfbfbf !important',
          borderBottom: 'none !important',
          mt: '0.5rem !important',
        }}
      >
        <AccordionSummary>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mr: 2 }}>
              {domain.name}
            </Typography>
            <Stack
              direction={'row'}
              spacing={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Stack
                direction={'row'}
                spacing={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BorderLinearProgress
                  variant="determinate"
                  value={
                    totalPages !== 0 ? (completePages / totalPages) * 100 : 0
                  }
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    color: customTheme.craa?.palette.blue,
                    mr: 3,
                    width: '30px',
                  }}
                >
                  {totalPages !== 0
                    ? ((completePages / totalPages) * 100).toFixed(0)
                    : 0}
                  %
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Chip
                  variant="outlined"
                  label={`${moment.utc(duration * 1000).format('HH:mm:ss')}`}
                  sx={{
                    borderRadius: '4px',
                    color: customTheme.craa?.palette.green,
                    width: '80px',
                  }}
                />
                <Chip
                  variant="outlined"
                  label={userTraining.status}
                  sx={{
                    borderRadius: '4px',
                    color:
                      userTraining.status === BaselineStatus.Complete
                        ? customTheme.craa?.palette.red
                        : userTraining.status === BaselineStatus.InProgress
                        ? customTheme.craa?.palette.green
                        : customTheme.craa?.palette.blue,
                    width: '124px',
                  }}
                />
                <a
                  style={{ textDecoration: 'none' }}
                  href={
                    process.env.NODE_ENV === 'production'
                      ? `https://craa-training-dev-3.hoansoft.com/training-client/trainings/${training._id}`
                      : `http://localhost:8084/training-client/trainings/${training._id}`
                  }
                  onClick={async () => {
                    try {
                      await axios.post('/v2/trainingLogs', {
                        userId: userTraining?.userId,
                        trainingId: userTraining.trainingId,
                        event: 'trainingStart',
                        severity: 1,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <Chip
                    clickable
                    color="primary"
                    label={
                      userTraining.status === BaselineStatus.Complete
                        ? 'View training'
                        : 'Start training'
                    }
                    sx={{
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}
                    variant={
                      userTraining.status === BaselineStatus.Complete
                        ? 'outlined'
                        : 'filled'
                    }
                  />
                </a>
              </Stack>
            </Stack>
          </Box>
        </AccordionSummary>
      </Accordion>
    );
  } else {
    return <Box></Box>;
  }
});

const Training = compose<any>(
  withFindOne({
    collectionName: 'userTrainings',
    getFilter: (props: TrainingProps) => ({
      _id: props.userTrainingId,
      status: { $ne: BaselineStatus.HasNotAssigned },
    }),
    version: 2,
  }),
  withFindOne({
    collectionName: 'trainings',
    getFilter: (props: TrainingProps) => ({
      _id: props.trainingId,
    }),
    version: 2,
  }),
  withFindOne({
    collectionName: 'domains',
    getFilter: (props: TrainingProps) => ({
      _id: props.userTraining.domainId,
    }),
    version: 2,
  })
)(TrainingView);

const Trainings = compose<any>(
  withStore('userAssessmentCycleStore'),
  withFindOne({
    collectionName: 'assessmentTypes',
    getFilter: (props: TrainingProps) => {
      const {
        selectedUACIndex,
        userAssessmentCycleStore: { userAssessmentCycles },
      } = props;
      return {
        _id: userAssessmentCycles[selectedUACIndex].assessmentTypeId,
      };
    },
    storeKey: 'assessmentTypeStore',
  })
)(TrainingsView);

type FollowupsViewProps = {
  selectedUACIndex: number;
  userAssessmentCycleStore: UserAssessmentCycleStore;
};

const FollowupsView = observer((props: FollowupsViewProps) => {
  const { selectedUACIndex } = props;

  const {
    assessmentTypeStore: { assessmentType },
    userAssessmentCycleStore: { userAssessmentCycles },
  } = useRootStore();

  const userAssessmentCycle = userAssessmentCycles[selectedUACIndex];

  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      {assessmentType?.followups.map((followup) => {
        const { userFollowupIds } = userAssessmentCycle;
        return (
          <Followup
            key={uniqid()}
            userAssessmentCycle={userAssessmentCycle}
            testTime={followup.testTime}
            assessmentTypeId={assessmentType._id}
            simulationId={followup.simulationId}
            userSimulationIds={userFollowupIds}
            domainId={followup.domain._id}
            followup={followup}
          />
        );
      })}
    </Stack>
  );
});

const Followups = compose<any>(
  withStore('userAssessmentCycleStore'),
  withFindOne({
    collectionName: 'assessmentTypes',
    getFilter: (props: FollowupsViewProps) => {
      const {
        selectedUACIndex,
        userAssessmentCycleStore: { userAssessmentCycles },
      } = props;
      return {
        _id: userAssessmentCycles[selectedUACIndex].assessmentTypeId,
      };
    },
    storeKey: 'assessmentTypeStore',
  })
)(FollowupsView);

type FollowupViewProps = {
  simulationId: string;
  simulation: Simulation;
  domainId: string;
  assessmentTypeId: string;
  userSimulationIds: string[];
  userSimulation: UserSimulation;
  testTime: number;
  followup: ATFollowup;
  userSimulationMutate: KeyedMutator<any>;
  userAssessmentCycle: any;
  assessmentCycle: any;
  businessCycle: BusinessCycle;
};

const FollowupView = observer((props: FollowupViewProps) => {
  const {
    simulationId,
    businessCycle,
    userAssessmentCycle,
    userSimulation,
    testTime: _testTime,
    followup,
    userSimulationMutate,
    userSimulationIds,
    domainId,
  } = props;
  console.log(userSimulation);

  const {
    uiState: { isProduction },
    uiState,
  } = useRootStore();

  const localState: any = useLocalObservable(() => ({
    open: false,
    message: '',
    severity: 'error',
    vertical: 'top',
    horizontal: 'center',
  }));

  const remoteUserFollowup = _.cloneDeep(userSimulation);
  const testTime = Utils.convert(_testTime, 'astr');

  const {
    routerStore,
    viewportRepository,
    userSimulationStore,
    assessmentTypeStore: { assessmentType },
    authStore: { user },
    userAssessmentCycleStore: { completeTrainings },
    userAssessmentCycleStore,
    screenRecorderStore: { controlButton },
  } = useRootStore();
  const _id = userSimulation?._id;

  const startTime = new Date(businessCycle?.startDate || 0).getTime();
  const currentTime = new Date().getTime();
  const endTime = new Date(businessCycle?.endDate || 0).getTime();
  const startDate = moment(businessCycle?.startDate).format('MM/DD Y HH:00');
  const endDate = moment(businessCycle?.endDate).format('MM/DD Y HH:00');
  const button = {
    text: 'Start',
    disabled: false,
    onClick: async () => {
      // console.log('onClick Start Buttin')

      userSimulationStore.userSimulation =
        userSimulationStore.userSimulations[_id];

      if (
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Scoring ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Adjudicating ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Published ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Distributed ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Review ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Exported
      ) {
        return Swal.fire({
          title: 'you have already completed',
          icon: 'success',
        });
      }

      if (userSimulationStore.userSimulations[_id]?.attemptCount! <= 0) {
        return Swal.fire({
          title: 'No chance to try. <br/>(Number of sessions remaining:0)',
          icon: 'error',
        });
        // if (isProduction) {
        // } else {
        //   console.log('dev mode attempt count skip');
        // }
      }

      controlButton.isVisible = true;

      if (!userSimulationStore.userSimulation?.isAgreed) {
        const result: SweetAlertResult<any> = await Swal.fire({
          width: 780,
          title: 'Agreement',
          html: 'agreement msg',
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
          userSimulationStore.userSimulation?.updateAgreed(true);
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

  let isInstructionViewed =
    assessmentType.baseline?.instructionIds.length !==
    userSimulationStore.userSimulations[_id]?.instructions?.length
      ? false
      : _.every(
          userSimulationStore.userSimulations[_id]?.instructions,
          'isViewed'
        );
  let isProtocolViewed =
    assessmentType.baseline?.protocolIds.length !==
    userSimulationStore.userSimulations[_id]?.protocols?.length
      ? false
      : _.every(
          userSimulationStore.userSimulations[_id]?.protocols,
          'isViewed'
        );
  let isStudyDocViewed =
    assessmentType.baseline?.studyLogIds.length !==
    userSimulationStore.userSimulations[_id].studyLogs?.length
      ? false
      : _.every(
          userSimulationStore.userSimulations[_id]?.studyLogs,
          'isViewed'
        );

  if (isNotYetStartDay) {
    button.text = 'Start - ' + startDate;
    button.disabled = true;
  } else if (isInRunning) {
    button.text = 'Start - expired At ' + endDate;
    button.disabled = false;
  } else if (isTimeout) {
    button.text = 'Timeout - expired At ' + endDate;
    button.disabled = true;
  }
  if (
    isInstructionViewed == false ||
    isProtocolViewed == false ||
    isStudyDocViewed == false
  ) {
    button.disabled = true;
  }

  if (
    completeTrainings.includes(userSimulation?.domainId) &&
    userSimulation?.status !== BaselineStatus.Scoring &&
    userSimulation?.status !== BaselineStatus.Adjudicating &&
    userSimulation?.status !== BaselineStatus.Published &&
    userSimulation?.status !== BaselineStatus.Distributed &&
    userSimulation?.status !== BaselineStatus.Review &&
    userSimulation?.status !== BaselineStatus.Exported
  ) {
    userAssessmentCycleStore.openFollowup = userSimulation?.domainId;
  }
  const [openPreview, setOpenPreview] = useState(false);
  const onClickPreview = async () => {
    setOpenPreview(true);
  };

  const onClickClose = () => {
    setOpenPreview(false);
  };

  // useEffect(()=>{
  //   if(userSimulationStore.userSimulation?._id === u)
  // },[userSimulationStore.userSimulation])

  return (
    <Accordion
      variant="elevation"
      defaultExpanded={
        completeTrainings.includes(userSimulation.domainId) ||
        userAssessmentCycle.bypass
      }
      disabled={
        !completeTrainings.includes(userSimulation.domainId) &&
        !userAssessmentCycle.bypass
      }
      sx={{
        borderTop: 'none !important',
        border: '1px solid #bfbfbf !important',
        mb: '0.5rem !important',
        mt: '0!important',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mr: 2 }}>
            {followup?.label}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Scoring ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Adjudicating ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Published ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Distributed ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Review ||
        userSimulationStore.userSimulations[_id]?.status ==
          BaselineStatus.Exported ? (
          <Card
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 1 }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack spacing={2} direction={'row'}>
                <Chip
                  size="medium"
                  variant="outlined"
                  label={
                    'Status : ' +
                    _.upperFirst(
                      userSimulationStore.userSimulations[_id]?.status
                    )
                  }
                  sx={{
                    borderRadius: '2px',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: customTheme.craa?.palette.green,
                    borderColor: customTheme.craa?.palette.green,
                    py: 2,
                  }}
                />
                <Chip
                  size="medium"
                  variant="outlined"
                  color="info"
                  label={` Submitted On : 
                      ${
                        userSimulationStore.userSimulations[_id]
                          ?.submittedAt !== null
                          ? moment(
                              userSimulationStore.userSimulations[_id]
                                ?.submittedAt!
                            ).format('yyyy MM/DD')
                          : '--'
                      }`}
                  sx={{
                    borderRadius: '2px',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: customTheme.craa?.palette.blue,
                    borderColor: customTheme.craa?.palette.blue,
                    py: 2,
                  }}
                />
                {userSimulationStore.userSimulations[_id]?.status ===
                  (BaselineStatus.Distributed as BaselineStatus) ||
                userSimulationStore.userSimulations[_id]?.status ===
                  (BaselineStatus.Published as BaselineStatus) ? (
                  <Chip
                    size="medium"
                    variant="outlined"
                    color="info"
                    label={
                      'Distributed Date : ' +
                      moment(
                        userSimulationStore.userSimulations[_id]?.distributedAt!
                      ).format('yyyy-MM-DD')
                    }
                    sx={{
                      borderRadius: '2px',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: customTheme.craa?.palette.blue,
                      borderColor: customTheme.craa?.palette.blue,
                      py: 2,
                    }}
                  />
                ) : (
                  <></>
                )}
              </Stack>
              <Button
                component="div"
                variant="contained"
                disabled={
                  userSimulationStore.userSimulations[_id]?.status !=
                  (BaselineStatus.Distributed as BaselineStatus)
                }
                sx={{
                  borderRadius: '2px',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: 'none',
                }}
                onClick={onClickPreview}
              >
                View Results
              </Button>
              <Modal open={openPreview} onClose={onClickClose}>
                <Box sx={{ maxHeight: '100vh' }}>
                  <AppBar position="static">
                    <Toolbar
                      sx={{
                        minHeight: '40px !important',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        pr: '0.5rem !important',
                      }}
                    >
                      <Button
                        onClick={onClickClose}
                        color="inherit"
                        sx={{
                          fontWeight: 700,
                          '&:hover': {
                            color: 'white !important',
                          },
                        }}
                      >
                        Close
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <Preview
                    userSimulationId={
                      userSimulationStore.userSimulations[_id]._id
                    }
                    simId={
                      userSimulationStore.userSimulations[_id].simulationId
                    }
                  />
                </Box>
              </Modal>
            </Box>
          </Card>
        ) : (
          <>
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
                    Instruction
                  </Typography>
                </Box>
                <Instructions
                  userSimulation={userSimulationStore.userSimulations[_id]}
                  instructionIds={followup?.instructionIds}
                />
              </Paper>
              {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
              <Paper
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
                    Protocol
                  </Typography>
                </Box>
                <Protocols
                  userSimulation={userSimulationStore.userSimulations[_id]}
                  protocolIds={followup?.protocolIds}
                />
              </Paper>
              {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
              <Paper
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
                    Study Document
                  </Typography>
                </Box>
                <StudyDocs
                  userSimulation={userSimulationStore.userSimulations[_id]}
                  studyDocIds={followup?.studyLogIds}
                />
              </Paper>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {/* <Alert
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
                  <div style={{ display: 'flex' }}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        width: '78px',
                        textAlign: 'right',
                        mr: 1,
                      }}
                    >
                      Start Date :
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                      {startDate}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        width: '78px',
                        textAlign: 'right',
                        mr: 1,
                      }}
                    >
                      End Date :
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                      {endDate}
                    </Typography>
                  </div>
                </Alert> */}
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
                      AllocatedTime :
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                      {testTime.hours < 10
                        ? '0' + testTime.hours
                        : testTime.hours}
                      :
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
                      TimeSpent :
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                      {Utils.convert(
                        userSimulationStore.userSimulation?._id ===
                          userSimulation._id
                          ? userSimulationStore.userSimulation?.usageTime!
                          : userSimulation.usageTime!,
                        'astr'
                      ).hours < 10
                        ? '0' +
                          Utils.convert(
                            userSimulationStore.userSimulation?._id ===
                              userSimulation._id
                              ? userSimulationStore.userSimulation?.usageTime!
                              : userSimulation.usageTime!,
                            'astr'
                          ).hours
                        : Utils.convert(
                            userSimulationStore.userSimulation?._id ===
                              userSimulation._id
                              ? userSimulationStore.userSimulation?.usageTime!
                              : userSimulation.usageTime!,
                            'astr'
                          ).hours}
                      :
                      {Utils.convert(
                        userSimulationStore.userSimulation?._id ===
                          userSimulation._id
                          ? userSimulationStore.userSimulation?.usageTime!
                          : userSimulation.usageTime!,
                        'astr'
                      ).minutes < 10
                        ? '0' +
                          Utils.convert(
                            userSimulationStore.userSimulation?._id ===
                              userSimulation._id
                              ? userSimulationStore.userSimulation?.usageTime!
                              : userSimulation.usageTime!,
                            'astr'
                          ).minutes
                        : Utils.convert(
                            userSimulationStore.userSimulation?._id ===
                              userSimulation._id
                              ? userSimulationStore.userSimulation?.usageTime!
                              : userSimulation.usageTime!,
                            'astr'
                          ).minutes}
                      :
                      {Utils.convert(
                        userSimulationStore.userSimulation?._id ===
                          userSimulation._id
                          ? userSimulationStore.userSimulation?.usageTime!
                          : userSimulation.usageTime!,
                        'astr'
                      ).seconds < 10
                        ? '0' +
                          Utils.convert(
                            userSimulationStore.userSimulation?._id ===
                              userSimulation._id
                              ? userSimulationStore.userSimulation?.usageTime!
                              : userSimulation.usageTime!,
                            'astr'
                          ).seconds
                        : Utils.convert(
                            userSimulationStore.userSimulation?._id ===
                              userSimulation._id
                              ? userSimulationStore.userSimulation?.usageTime!
                              : userSimulation.usageTime!,
                            'astr'
                          ).seconds}
                    </Typography>
                  </div>
                </Alert>
              </Grid>
              <Grid item xs={4}>
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
                      userSimulationStore.userSimulation?._id ===
                        userSimulation._id
                        ? userSimulationStore.userSimulation?.status
                        : userSimulation?.status
                    )}
                  </AlertTitle>
                </Alert>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Box
                    component={'span'}
                    sx={{
                      fontWeight: 600,
                      color:
                        userSimulationStore.userSimulation?.attemptCount! <= 0
                          ? customTheme.craa?.palette.red
                          : customTheme.craa?.palette.green,
                      fontSize: '15px',
                    }}
                  >
                    {`Number of sessions remaining : ${
                      userSimulationStore.userSimulation?._id ===
                      userSimulation._id
                        ? userSimulationStore.userSimulation?.attemptCount
                        : userSimulation?.attemptCount
                    }`}
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      textAlign: 'right',
                    }}
                  >
                    <Chip
                      disabled={button.disabled}
                      clickable
                      onClick={(e) => {
                        e.stopPropagation();
                        button.onClick();
                      }}
                      color={'primary'}
                      label={'Simulation Start'}
                      sx={{
                        borderRadius: '2px',
                        fontWeight: 700,
                        width: '130px',
                        ml: 1,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
          </>
        )}

        {/* <Stack direction={'row'} spacing={1}>
          <Chip
            variant="filled"
            color="info"
            label={`Attempt count: ${userSimulation.attemptCount}`}
            sx={{
              fontWeight: 600,
            }}
          ></Chip>

          <Chip
            sx={{
              fontWeight: 600,
            }}
            color="info"
            label={`usage time: 00:00:00`}
          />
        </Stack> */}
      </AccordionDetails>
    </Accordion>
  );
});

const getFollowupFilter = ({ simulationId }: FollowupViewProps) => ({
  _id: simulationId,
});

const Followup = compose<any>(
  withFindOne({
    collectionName: 'simulations',
    getFilter: getFollowupFilter,
  }),
  withFindOne({
    collectionName: 'assessmentCycles',
    getFilter: (props: any) => ({
      _id: props.userAssessmentCycle.assessmentCycle._id,
    }),
  }),
  withREST({
    collectionName: 'clientUnits',
    propName: 'businessCycle',
    path: (props) => {
      const userAssessmentCycle = props.userAssessmentCycle;
      return `${userAssessmentCycle.clientUnitId}/${userAssessmentCycle.businessUnitId}/${userAssessmentCycle.businessCycleId}`;
    },
  }),
  withFindOne({
    collectionName: 'userSimulations',
    version: 2,
    getFilter: ({ userSimulationIds, domainId }: FollowupViewProps) => ({
      _id: {
        $in: userSimulationIds,
      },
      status: { $ne: BaselineStatus.HasNotAssigned },
      domainId: domainId,
    }),
    storeKey: 'userSimulationStore',
  })
)(FollowupView);
