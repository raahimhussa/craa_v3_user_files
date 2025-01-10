import { TextField } from '@components';
import { Save, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Card as MuiCard,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  Alert,
  InputLabel,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import uniqid from 'uniqid';
import InputBase from '../../InputBase/InputBase';
import Note from 'src/models/note';
import _ from 'lodash';
import Card from './Card/Card';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import customTheme from 'src/ui/theme/customizedTheme';
import DataGrid from '../../DataGrid/DataGrid';
import Normal from '../Normal/Normal';
import { Mode } from 'src/stores/noteStore/types';

type MiniProps = {
  height: number;
  isNormal: boolean;
};
function MiniView(props: MiniProps) {
  const { height, isNormal } = props;

  useEffect(() => {
    console.log(isNormal);
  }, [isNormal]);

  const {
    noteStore,
    viewportStore,
    uiState: { note },
    screenRecorderStore,
  } = useRootStore();

  const activeViewport = viewportStore.getActiveViewport();
  // const [disabled, setDisabled] = useState(true);
  const [inputLength, setInputLength] = useState(0);

  const countInput = (val: any) => {
    setInputLength(val.length);
  };

  useEffect(() => {
    if (activeViewport == undefined) {
      noteStore.disabled = true;
      // setDisabled(true);
    } else {
      noteStore.disabled = false;
      // setDisabled(false);
    }
  }, [activeViewport]);
  const { enqueueSnackbar } = useSnackbar();

  const onClickSave = async () => {
    const note: any = await noteStore.addNote();
    if (note?._id) {
      if (noteStore.mode === Mode.Normal) {
        noteStore.mode = Mode.Mini;
        noteStore.mode = Mode.Normal;
      }

      enqueueSnackbar('Saved', { variant: 'success' });
    } else {
      return;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: grey[100],
        // overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        // boxShadow: 10,
        // minWidth: 400,
        border: '1px solid black',
        borderColor: 'rgb(25, 52, 51,0.3)',
        borderTop: 'none',
        px: 1,
        height: height,
      }}
    >
      {isNormal ? (
        <Normal height={height} />
      ) : (
        <>
          <Paper
            className="search-box"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              m: 1,
              bgcolor: '#e6e6e6',
              borderRadius: '13px !important',
              mb: 0,
            }}
          >
            <Search sx={{ color: '#b3b3b3', ml: 1, fontSize: '18px' }} />
            <InputBase
              state={noteStore}
              path="searchText"
              sx={{
                flex: 1,
                // height: 56,
                p: 1,
              }}
              placeholder={`Search notes`}
            />
            {/* <IconButton sx={{ p: '10px' }}>
          <Search />
        </IconButton> */}
          </Paper>
          <Box
            sx={{
              px: 1,
              py: 2,
              bgcolor: grey[100],
              display: 'flex',
              flex: 1,
              height: height,
              minWidth: 400,
              maxHeight: 700,
              paddingBottom: 40,
              overflow: 'scroll',
              flexDirection: 'column',
            }}
          >
            <Notes />
          </Box>
        </>
      )}
      <Paper
        elevation={6}
        variant="outlined"
        sx={{
          p: 2,
          bottom: 0,
          position: 'fixed',
          width: '100%',
          right: 0,
        }}
      >
        <Stack spacing={2}>
          {noteStore.disabled ? (
            activeViewport !== undefined ? (
              <Alert severity="warning">
                Finish editing note to add a note.
              </Alert>
            ) : (
              <Alert severity="warning">Select viewport to add a note.</Alert>
            )
          ) : (
            <MuiCard className="noshadow">
              <CardContent sx={{ p: '0 !important' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack direction={'row'} spacing={1}>
                    <Chip
                      sx={{
                        fontWeight: 700,
                        color: customTheme.craa?.palette.blue,
                      }}
                      label={activeViewport?.simDoc?.title}
                    />
                    <Chip
                      sx={{
                        fontWeight: 700,
                        color: customTheme.craa?.palette.blue,
                      }}
                      label={`Page : ${
                        activeViewport?.simDoc?.currentPage! + 1
                      } `}
                    />
                    <Chip
                      sx={{
                        fontWeight: 700,
                        color: customTheme.craa?.palette.orange,
                      }}
                      label={`Viewport : ${activeViewport?.index! + 1}`}
                    />
                  </Stack>
                  {activeViewport?.simDoc?.kind! === 'Document' ? (
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: customTheme.craa?.palette.mainfont,
                      }}
                    >
                      <span
                        style={{
                          color:
                            inputLength < 300
                              ? customTheme.craa?.palette.green
                              : customTheme.craa?.palette.red,
                          marginRight: '0.1rem',
                        }}
                      >
                        {inputLength}
                      </span>
                      <span
                        style={{
                          marginRight: '0.1rem',
                        }}
                      >
                        /
                      </span>
                      300
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Box>
              </CardContent>
            </MuiCard>
          )}
          {activeViewport?.simDoc?.kind! === 'StudyMedication' ? (
            <Box
              sx={{
                // height: '160px',
                border: '1px solid black',
                position: 'relative',
                width: '100%',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderColor: (theme) => theme.craa?.palette.lightborder,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 0.5,
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Number of capsules taken by subject
                </InputLabel>
                <TextField
                  variant="outlined"
                  state={noteStore.form}
                  path="complianceNote.taken"
                  className="medication-input"
                  disabled={screenRecorderStore.isVideoSaving}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 0.5,
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  Number of capsules that should have been
                  <br /> taken by subject
                </InputLabel>
                <TextField
                  variant="outlined"
                  state={noteStore.form}
                  path="complianceNote.shouldTaken"
                  className="medication-input"
                  disabled={screenRecorderStore.isVideoSaving}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Percent(%) Compliance
                </InputLabel>
                <TextField
                  variant="outlined"
                  state={noteStore.form}
                  path="complianceNote.percent"
                  className="medication-input"
                  disabled={screenRecorderStore.isVideoSaving}
                  InputProps={{
                    endAdornment: (
                      <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>
                        %
                      </Typography>
                    ),
                  }}
                />
              </Box>
              <Button
                fullWidth
                disabled={noteStore.disabled}
                onClick={onClickSave}
                sx={{
                  // position: 'absolute',
                  // width: '18%',
                  // height: 32,
                  // right: 5,
                  // bottom: 5,
                  bgcolor: (theme) => theme.palette.secondary.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.secondary.dark,
                  },
                }}
              >
                <Box
                  sx={{
                    // color: (theme) => theme.craa?.palette.orange,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  SAVE
                </Box>
              </Button>
            </Box>
          ) : activeViewport?.simDoc?.kind! === 'RescueMedication' ? (
            <Box
              sx={{
                // height: '160px',
                border: '1px solid black',
                position: 'relative',
                width: '100%',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderColor: (theme) => theme.craa?.palette.lightborder,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Number of capsules taken by subject
                </InputLabel>
                <TextField
                  variant="outlined"
                  state={noteStore.form}
                  path="complianceNote.taken"
                  className="medication-input"
                  disable={screenRecorderStore.isVideoSaving}
                />
              </Box>
              <Button
                fullWidth
                disabled={noteStore.disabled}
                onClick={onClickSave}
                sx={{
                  // position: 'absolute',
                  // width: '18%',
                  // height: 32,
                  // right: 5,
                  // bottom: 5,
                  bgcolor: (theme) => theme.palette.secondary.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.secondary.dark,
                  },
                }}
              >
                <Box
                  sx={{
                    // color: (theme) => theme.craa?.palette.orange,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  SAVE
                </Box>
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                // alignItems: 'center',
                // flexDirection: 'column',
              }}
            >
              <TextField
                inputProps={{ maxLength: 300 }}
                onChange={(e: any) => {
                  countInput(e);
                }}
                disabled={
                  noteStore.disabled || screenRecorderStore.isVideoSaving
                }
                fullWidth
                onFocus={() => (note.isFocused = true)}
                onBlur={() => (note.isFocused = false)}
                minRows={2}
                variant="outlined"
                multiline
                maxRows={8}
                state={noteStore.form}
                path="text"
              />
              <Button
                disabled={noteStore.disabled}
                onClick={onClickSave}
                sx={{
                  // position: 'absolute',
                  width: 50,
                  // height: 45,
                  minWidth: '10px',
                  // height: 32,
                  // right: 12,
                  // bottom: 12,
                  bgcolor: (theme) => theme.palette.secondary.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.secondary.dark,
                  },
                  ml: 0.5,
                  // borderRadius: '50% !important',
                }}
              >
                <Save
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '20px',
                  }}
                />
                {/* <Box
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  SAVE
                </Box> */}
              </Button>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
export default observer(MiniView);

const Notes = observer((props: any) => {
  const {
    noteStore: { originalNotes },
  } = useRootStore();
  const { setDisabled } = props;
  const renderNote = (note: Note) => {
    return (
      <Box key={uniqid()} sx={{ mb: 1 }}>
        <Card setDisabled={setDisabled} note={note} />
      </Box>
    );
  };

  return <Box>{originalNotes?.map(renderNote)}</Box>;
});
