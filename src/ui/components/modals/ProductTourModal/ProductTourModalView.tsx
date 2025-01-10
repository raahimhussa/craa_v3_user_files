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
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
  Toolbar,
  Modal,
  LinearProgress,
  linearProgressClasses,
  InputBase,
  ButtonGroup,
  Divider,
  Fab,
} from '@mui/material';
import {
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Edit,
} from '@mui/icons-material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
  ExpandMore,
  RunCircle,
  VideoLibrary,
  WatchLater,
} from '@mui/icons-material';
import { observer } from 'mobx-react';
import YouTube from 'react-youtube';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';
import customTheme from 'src/ui/theme/customizedTheme';
import Instructions from '../../Instructions/Instructions';
import Protocols from '../../Protocols/Protocols';
import StudyDocs from '../../StudyDocs/StudyDocs';
import BaselineCard from 'src/ui/components/BaselineCard/BaselineCard';
import ProductTour from '../../ProductTour/ProductTour';
import { grey, red } from '@mui/material/colors';

function ProductTourModalView(props: any) {
  const {
    modalStore,
    userAssessmentCycleStore,
    assessmentTypeStore,
    userSimulationStore,
  } = useRootStore();
  const type = modalStore.tourType;

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

  return (
    <Box>
      <ProductTour type={type} />
      {type === 'baseline' ? (
        <Box>
          <Accordion
            expanded={true}
            className="paper-grid asc"
            defaultExpanded={true}
          >
            <AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RunCircle
                  fontSize="large"
                  sx={{
                    mr: 1,
                    fontSize: '1.9rem',
                    color: (theme) => theme.craa?.palette.blue,
                  }}
                />
                <Typography
                  className="first"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: (theme) => theme.craa?.palette.darkfont,
                    mr: 3,
                  }}
                >
                  {`AssessmentCycle`}
                </Typography>
                <IconButton
                  className="simTutorial"
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
                    <VideoLibrary sx={{ fontSize: '1.1rem', mr: '0.3rem' }} />
                  </Tooltip>
                  <Typography
                    variant="button"
                    sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                  >
                    Watch Simulation Tutorial
                  </Typography>
                </IconButton>
                <Chip
                  className="dueDate"
                  sx={{
                    fontWeight: 500,
                    ml: 2,
                  }}
                  label={`Due Date : YYYY MM/DD HH:mm`}
                />
                <Box>
                  <Typography>{}</Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion className="baseline" expanded={true}>
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
                    borderColor: (theme) => theme.craa?.palette.lightborder,
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
                      }}
                    >
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
                        userSimulationMutate={''}
                        userSimulation={userSimulationStore.userSimulation}
                        instructionIds={
                          assessmentTypeStore.assessmentType?.baseline
                            ?.instructionIds
                        }
                      />
                    </Paper>
                    {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
                    <Paper
                      className="protocol"
                      sx={{ width: '32.7%', borderRadius: '2px', pb: 1 }}
                    >
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
                        userSimulationMutate={''}
                        userSimulation={userSimulationStore.userSimulation}
                        protocolIds={
                          assessmentTypeStore.assessmentType?.baseline
                            ?.protocolIds
                        }
                      />
                    </Paper>
                    {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
                    <Paper
                      className="studydoc"
                      sx={{ width: '32.7%', borderRadius: '2px', pb: 1 }}
                    >
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
                        userSimulationMutate={''}
                        userSimulation={userSimulationStore.userSimulation}
                        studyDocIds={
                          assessmentTypeStore.assessmentType?.baseline
                            ?.studyLogIds
                        }
                      />
                    </Paper>
                  </Box>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={4} className="date">
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
                              Started Date :
                            </Typography>
                            <Typography
                              sx={{ fontSize: '14px', fontWeight: 600 }}
                            >
                              02/07 2023 02:00
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
                              Submitted Date :
                            </Typography>
                            <Typography
                              sx={{ fontSize: '14px', fontWeight: 600 }}
                            >
                              --
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
                              AssignedTime :
                            </Typography>
                            <Typography
                              sx={{ fontSize: '14px', fontWeight: 600 }}
                            >
                              10h 0m 0s
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
                            <Typography
                              sx={{ fontSize: '14px', fontWeight: 600 }}
                            >
                              0h 0m 0s
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
                            IN PROGRESS
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
                          color: customTheme.craa?.palette.green,
                          fontSize: '15px',
                        }}
                      >
                        {`Number of sessions remaining : 5`}
                      </Box>
                      <Button
                        className="start"
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
                        START
                      </Button>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion className="training" disabled={true}>
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
                    borderColor: (theme) => theme.craa?.palette.lightborder,
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
                    className="trainingTutorial"
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
                      <VideoLibrary sx={{ fontSize: '1.1rem', mr: '0.3rem' }} />
                    </Tooltip>
                    <Typography
                      variant="button"
                      sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                    >
                      Watch Training Tutorial
                    </Typography>
                  </IconButton>
                </AccordionSummary>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : type === 'training' ? (
        <Box>
          <Accordion className="training" expanded={true}>
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
                borderColor: (theme) => theme.craa?.palette.lightborder,
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
                className="trainingTutorial"
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
                  <VideoLibrary sx={{ fontSize: '1.1rem', mr: '0.3rem' }} />
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
              <Stack spacing={1} sx={{ p: 2 }} className="trainings">
                <Box
                  sx={{
                    // border: '1px solid #bfbfbf',
                    mb: '1rem !important',
                  }}
                >
                  <Accordion
                    sx={{
                      bgcolor: 'white',
                      border: '1px solid #bfbfbf !important',
                      borderBottom: 'none !important',
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
                        <Typography
                          className="domain"
                          sx={{ fontWeight: 600, fontSize: '0.9rem', mr: 2 }}
                        >
                          Protocol Requirements
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
                            className="progress"
                            direction={'row'}
                            spacing={1}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <BorderLinearProgress
                              variant="determinate"
                              value={0}
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
                              0%
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
                              className="duration"
                              variant="outlined"
                              label={`HH:mm:ss`}
                              sx={{
                                borderRadius: '4px',
                                color: customTheme.craa?.palette.green,
                                width: '100px',
                              }}
                            />
                            <Chip
                              className="tstatus"
                              variant="outlined"
                              label="HasNotStarted"
                              sx={{
                                borderRadius: '4px',
                                color: customTheme.craa?.palette.blue,
                                width: '124px',
                              }}
                            />
                            <a
                              className="trainingBtn"
                              style={{ textDecoration: 'none' }}
                              // href={`https://craa-training-dev.hoansoft.com/training-client/trainings/${training._id}`}
                            >
                              <Chip
                                clickable
                                color="primary"
                                label={'Start training'}
                                sx={{
                                  borderRadius: '4px',
                                  fontWeight: 700,
                                }}
                                variant={'filled'}
                              />
                            </a>
                          </Stack>
                        </Stack>
                      </Box>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion
                    variant="elevation"
                    sx={{
                      borderTop: 'none !important',
                      border: '1px solid #bfbfbf !important',
                    }}
                    className="followup"
                    expanded={true}
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
                        <Typography
                          sx={{ fontWeight: 600, fontSize: '0.9rem', mr: 2 }}
                        >
                          Protocol Requirements
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
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
                            }}
                          >
                            <Box
                              sx={{
                                // bgcolor: 'rgb(241,250,255) !important',
                                pl: 1,
                                py: 0.4,
                                mb: 1,
                                borderBottom: '1px solid black',
                                borderColor:
                                  customTheme.craa?.palette.lightborder,
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
                              userSimulation={
                                userSimulationStore.userSimulation
                              }
                              instructionIds={
                                assessmentTypeStore.assessmentType?.baseline
                                  ?.instructionIds
                              }
                            />
                          </Paper>
                          {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
                          <Paper
                            sx={{ width: '32.7%', borderRadius: '2px', pb: 1 }}
                          >
                            <Box
                              sx={{
                                // bgcolor: 'rgb(241,250,255) !important',
                                pl: 1,
                                py: 0.4,
                                mb: 1,
                                borderBottom: '1px solid black',
                                borderColor:
                                  customTheme.craa?.palette.lightborder,
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
                              userSimulation={
                                userSimulationStore.userSimulation
                              }
                              protocolIds={
                                assessmentTypeStore.assessmentType?.baseline
                                  ?.protocolIds
                              }
                            />
                          </Paper>
                          {/* <Box sx={{ width: 10, bgcolor: grey[50] }} /> */}
                          <Paper
                            sx={{ width: '32.7%', borderRadius: '2px', pb: 1 }}
                          >
                            <Box
                              sx={{
                                // bgcolor: 'rgb(241,250,255) !important',
                                pl: 1,
                                py: 0.4,
                                mb: 1,
                                borderBottom: '1px solid black',
                                borderColor:
                                  customTheme.craa?.palette.lightborder,
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
                              userSimulation={
                                userSimulationStore.userSimulation
                              }
                              studyDocIds={
                                assessmentTypeStore.assessmentType?.baseline
                                  ?.studyLogIds
                              }
                            />
                          </Paper>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Alert
                              severity="info"
                              sx={{
                                minHeight: '70px',
                                borderRadius: '10px',
                                px: 1,
                              }}
                              icon={false}
                            >
                              {/* <AlertTitle sx={{}} >Date Info</AlertTitle> */}
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
                                <Typography
                                  sx={{ fontSize: '14px', fontWeight: 600 }}
                                >
                                  YYYY MM/DD
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
                                <Typography
                                  sx={{ fontSize: '14px', fontWeight: 600 }}
                                >
                                  YYYY MM/DD
                                </Typography>
                              </div>
                            </Alert>
                          </Grid>
                          <Grid item xs={4}>
                            <Alert
                              severity="info"
                              sx={{
                                minHeight: '70px',
                                borderRadius: '10px',
                                px: 1,
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
                                  AssignedTime :
                                </Typography>
                                <Typography
                                  sx={{ fontSize: '14px', fontWeight: 600 }}
                                >
                                  0h 0m 0s
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
                                <Typography
                                  sx={{ fontSize: '14px', fontWeight: 600 }}
                                >
                                  0h 0m 0s
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
                                ASSIGNED
                              </AlertTitle>
                            </Alert>
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
                            component={'span'}
                            sx={{
                              fontWeight: 600,
                              color: customTheme.craa?.palette.green,
                              fontSize: '15px',
                            }}
                          >
                            {`Number of sessions remaining : 5`}
                          </Box>
                          <Chip
                            clickable
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
                      </>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : (
        <Box>
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    background: '#f2f2f3',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    height: '30px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      ml: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      className="home"
                      sx={{
                        mr: 2,
                        bgcolor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        color: '#3d4042',
                        borderRadius: '7px',
                        fontSize: '0.75rem',
                        py: '0',
                        px: '0',
                        height: '20px',
                        '&:hover': {
                          bgcolor: 'white',
                          boxShadow: 'none',
                          border: 'none',
                        },
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Home
                    </Button>
                    <Button
                      className="home"
                      sx={{
                        mr: 2,
                        bgcolor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        color: '#3d4042',
                        borderRadius: '7px',
                        fontSize: '0.75rem',
                        py: '0',
                        px: '0',
                        height: '20px',
                        '&:hover': {
                          bgcolor: 'white',
                          boxShadow: 'none',
                          border: 'none',
                        },
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Add Viewport
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <Box
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        display: 'flex',
                      }}
                    >
                      <Box
                        className="ac"
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <RunCircle
                          htmlColor="#4caf50"
                          sx={{ fontSize: '1.2rem' }}
                        />
                        <Box
                          sx={{
                            ml: 1,
                            color: '#4caf50',
                            fontSize: 18,
                            fontWeight: 700,
                          }}
                        >
                          5
                        </Box>
                      </Box>
                      <Button
                        className="submit"
                        sx={{
                          mx: 2,
                          // bgcolor: '#fbe9ec',
                          color: 'rgb(183, 33, 54)',
                          fontWeight: 700,
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          boxShadow: 'none',
                          px: '0.5rem',
                          height: '20px',
                          ml: 3,
                          py: '11px !important',
                          // border: 'none',
                          '&:hover': {
                            bgcolor: 'white',
                            boxShadow: 'none',
                            // border: 'none',
                          },
                        }}
                        variant="outlined"
                      >
                        Submit
                      </Button>
                      <Box
                        className="timer"
                        component={'span'}
                        sx={{
                          fontSize: 20,
                          position: 'relative',
                          right: 0,
                          display: 'flex',
                          color: '#1976d2',
                          alignItems: 'center',
                        }}
                      >
                        <WatchLater
                          sx={{ mr: 1, fontSize: '1.2rem' }}
                          fontSize="medium"
                        />
                        <div
                          style={{
                            minWidth: '92px',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                          }}
                        >
                          <span>10</span>:<span>00</span>:<span>00</span>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Paper
                      sx={{
                        bgcolor: grey[500],
                        py: 0,
                        borderRadius: '8px',
                        px: 1,
                        mr: 1,
                        boxShadow: 'none',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                        }}
                      >
                        {process.env.NODE_ENV === 'production' ? 'Beta' : 'Dev'}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    bgcolor: '#3d4042',
                    height: '30px',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      alignItems: 'center',
                      ml: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      flex: 1,
                      height: '30px',
                    }}
                  >
                    <Button
                      id="documents"
                      sx={{
                        color: 'white',
                        p: 0,
                        mr: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <PostAddIcon
                        sx={{
                          fontSize: '1.2rem',
                          mt: '-0.2rem',
                          mr: '0.3rem',
                        }}
                      />
                      <Typography
                        sx={{ fontSize: '12px', fontWeight: 700, mt: 0.3 }}
                      >
                        Select Document
                      </Typography>
                    </Button>
                    <Box
                      sx={{
                        color: 'white',
                        display: 'flex',
                        flex: 1,
                        ml: 1,
                        fontWeight: 700,
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '12px',
                          lineHeight: 0.9,
                        }}
                      >
                        {' '}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          bgcolor: '#3d4042',
                          height: '30px',
                          alignItems: 'center',
                          px: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '30px',
                            mr: 1,
                          }}
                        >
                          <IconButton sx={{ p: 0 }}>
                            <ArrowLeft htmlColor="white" />
                          </IconButton>
                          <IconButton sx={{ p: 0 }}>
                            <ArrowRight htmlColor="white" />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                          }}
                        >
                          Page
                        </Box>
                        <Box
                          sx={{ display: 'flex', ml: 2, alignItems: 'center' }}
                        >
                          <InputBase
                            sx={{
                              color: 'white',
                              bgcolor: '#6e7477',
                              width: '30px',
                              height: '20px',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              pl: '0.3rem',
                            }}
                            value={1}
                          />
                          <Box
                            sx={{
                              color: 'white',
                              mx: 1,
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              ml: 1,
                            }}
                          >
                            of
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              height: 32,
                              color: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                            }}
                          >
                            0
                          </Box>
                        </Box>

                        <ButtonGroup
                          sx={{ ml: 3, height: '20px', border: 'none' }}
                          size="small"
                        >
                          <Button
                            sx={{
                              border: 'none',
                              '&:hover': {
                                border: 'none',
                                // bgcolor: '#62676a !important',
                              },
                              p: '0 !important',
                            }}
                          >
                            <ZoomIn sx={{ color: 'white !important' }} />
                          </Button>
                          <Typography
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              width: '45px',
                            }}
                          >
                            100%
                          </Typography>
                          <Button
                            sx={{
                              border: 'none',
                              '&:hover': {
                                border: 'none',
                                // bgcolor: '#62676a !important',
                              },
                              p: '0 !important',
                            }}
                          >
                            <ZoomOut sx={{ color: 'white !important' }} />
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', height: 56 }}
                    ></Box>
                  </Box>
                </Box>
                <Divider sx={{ bgcolor: 'white' }} />
                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    border: '1px solid white !important',
                    bgcolor: '#525659',
                    alignItems: 'center',
                    // minWidth: '681px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'column',
                      // minWidth: '681px',
                      width: '100%',
                      p: '0.5rem',
                      bgcolor: grey[700],
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'none',
                        bgcolor: '#fbe9ec',
                        color: 'rgb(183,33,54)',
                        fontSize: '0.9rem',
                        height: 25,
                        fontWeight: 700,
                        textAlign: 'center',
                        verticalAlign: 'center',
                        mt: '-0.5rem',
                        ml: '-0.5rem',
                        position: 'absolute',
                        zIndex: 2,
                        width: '100%',
                      }}
                    >
                      Selected Viewport
                    </Box>
                    <Box
                      sx={{
                        borderColor: grey[500],
                        width: '100%',
                        height: 'calc(100% - 80px)',
                        bgcolor: 'white',
                        cursor: 'grab',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: grey[700],
                        justifyContent: 'center',
                      }}
                    >
                      <Typography>PDF</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    bgcolor: '#3d4042',
                    height: '30px',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      alignItems: 'center',
                      ml: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      flex: 1,
                      height: '30px',
                    }}
                  >
                    <Button
                      id="documents"
                      sx={{
                        color: 'white',
                        p: 0,
                        mr: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <PostAddIcon
                        sx={{
                          fontSize: '1.2rem',
                          mt: '-0.2rem',
                          mr: '0.3rem',
                        }}
                      />
                      <Typography
                        sx={{ fontSize: '12px', fontWeight: 700, mt: 0.3 }}
                      >
                        Select Document
                      </Typography>
                    </Button>
                    <Box
                      sx={{
                        color: 'white',
                        display: 'flex',
                        flex: 1,
                        ml: 1,
                        fontWeight: 700,
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '12px',
                          lineHeight: 0.9,
                        }}
                      >
                        {' '}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          bgcolor: '#3d4042',
                          height: '30px',
                          alignItems: 'center',
                          px: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '30px',
                            mr: 1,
                          }}
                        >
                          <IconButton sx={{ p: 0 }}>
                            <ArrowLeft htmlColor="white" />
                          </IconButton>
                          <IconButton sx={{ p: 0 }}>
                            <ArrowRight htmlColor="white" />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                          }}
                        >
                          Page
                        </Box>
                        <Box
                          sx={{ display: 'flex', ml: 2, alignItems: 'center' }}
                        >
                          <InputBase
                            sx={{
                              color: 'white',
                              bgcolor: '#6e7477',
                              width: '30px',
                              height: '20px',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              pl: '0.3rem',
                            }}
                            value={1}
                          />
                          <Box
                            sx={{
                              color: 'white',
                              mx: 1,
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              ml: 1,
                            }}
                          >
                            of
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              height: 32,
                              color: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                            }}
                          >
                            0
                          </Box>
                        </Box>

                        <ButtonGroup
                          sx={{ ml: 3, height: '20px', border: 'none' }}
                          size="small"
                        >
                          <Button
                            sx={{
                              border: 'none',
                              '&:hover': {
                                border: 'none',
                                // bgcolor: '#62676a !important',
                              },
                              p: '0 !important',
                            }}
                          >
                            <ZoomIn sx={{ color: 'white !important' }} />
                          </Button>
                          <Typography
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              width: '45px',
                            }}
                          >
                            100%
                          </Typography>
                          <Button
                            sx={{
                              border: 'none',
                              '&:hover': {
                                border: 'none',
                                // bgcolor: '#62676a !important',
                              },
                              p: '0 !important',
                            }}
                          >
                            <ZoomOut sx={{ color: 'white !important' }} />
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', height: 56 }}
                    ></Box>
                  </Box>
                </Box>
                <Divider sx={{ bgcolor: 'white' }} />
                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    border: '1px solid white !important',
                    bgcolor: '#525659',
                    alignItems: 'center',
                    // minWidth: '681px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'column',
                      // minWidth: '681px',
                      width: '100%',
                      p: '0.5rem',
                      bgcolor: grey[700],
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'block',
                        bgcolor: '#fbe9ec',
                        color: 'rgb(183,33,54)',
                        fontSize: '0.9rem',
                        height: 25,
                        fontWeight: 700,
                        textAlign: 'center',
                        verticalAlign: 'center',
                        mt: '-0.5rem',
                        ml: '-0.5rem',
                        position: 'absolute',
                        zIndex: 2,
                        width: '100%',
                      }}
                    >
                      Selected Viewport
                    </Box>
                    <Box
                      sx={{
                        borderColor: grey[500],
                        width: '100%',
                        height: '600px',
                        bgcolor: 'white',
                        cursor: 'grab',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: grey[700],
                        justifyContent: 'center',
                      }}
                    >
                      <Typography>PDF</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Fab
                className="note"
                sx={{
                  width: 130,
                  height: 50,
                  right: 100,
                  position: 'fixed',
                  bottom: 205,
                  zIndex: 1003,
                  bgcolor: customTheme.craa?.palette.orange,
                  borderRadius: '8px !important',
                  // boxShadow: '0 8px 16px 0 rgb(0 171 85 / 24%)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#d7690f',
                    color: 'white !important',
                  },
                }}
                variant="extended"
              >
                NOTE
                <Edit
                  sx={{
                    ml: 1,
                  }}
                  fontSize="small"
                />
              </Fab>
              {/* <Notes /> */}
            </Box>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
export default observer(ProductTourModalView);
