import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  InputLabel,
  DialogTitle,
  DialogContentText,
  Typography,
  DialogActions,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import Note from 'src/models/note';
import { useRootStore } from 'src/stores';
import InputBase from 'src/ui/components/InputBase/InputBase';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import customTheme from 'src/ui/theme/customizedTheme';
import { useState } from 'react';

function CardView(props: any) {
  const {
    note,
  }: // setDisabled,
  {
    note: Note;
    // setDisabled: any;
  } = props;
  const { noteStore } = useRootStore();
  const searchText = noteStore.searchText;
  const regExp = new RegExp(searchText, 'i');
  const isVisible = regExp.test(note?.text || '');
  const { enqueueSnackbar } = useSnackbar();
  const [isEdit, setIsEdit] = useState(false);
  const [editNote, setEditNote] = useState(note.text);
  const [open, setOpen] = useState(false);
  const [inputLength, setInputLength] = useState(0);

  if (!isVisible) return null;
  if (!note) return null;

  const countInput = (val: any) => {
    setInputLength(val.length);
  };

  const onClickEdit = async () => {
    note.edit = editNote;
    await note.save();
    setIsEdit(false);
    // setDisabled(false);
    noteStore.disabled = false;
    enqueueSnackbar('Edited!', { variant: 'success' });
  };

  const onClickDelete = async () => {
    await note.delete();
    setOpen(false);
    enqueueSnackbar('Deleted!', { variant: 'success' });
  };

  const highlightedText = (text: any, query: any) => {
    if (query !== '' && text.toLowerCase().includes(query.toLowerCase())) {
      const parts = text.split(new RegExp(`(${query})`, 'gi'));

      return (
        <>
          {parts.map((part: any, index: any) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <mark key={index}>{part}</mark>
            ) : (
              part
            )
          )}
        </>
      );
    }

    return text;
  };

  return (
    <Card
      className="note-card"
      sx={{
        mb: 1,
      }}
    >
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete the note? This process cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onClickDelete}
            autoFocus
            sx={{
              color: 'red',
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <CardContent
        sx={{
          pr: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              pl: 1.5,
              pt: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: '15px !important',
                mr: 1.5,
                fontWeight: 700,
                color: 'rgb(73, 73, 73)',
              }}
            >
              {/* {`[VP${note.viewport?.index! + 1}] ${
                note.viewport?.simDoc?.title
              }`} */}
              {`${note.viewport?.simDoc?.title}`}              
            </Typography>
            {/* <Typography variant="h6" sx={{ fontSize: "15px !important" }}>
              {`Page : ${props.note.currentPage}`}
            </Typography> */}
          </Box>
          <ButtonGroup>
            {!isEdit ? (
              <Button
                sx={{
                  border: 'none',
                  p: '0 !important',
                  mr: -0.5,
                  '&:hover': {
                    border: 'none',
                  },
                }}
                onClick={() => {
                  setEditNote(note.text);
                  setInputLength(note.text.length);
                  noteStore.disabled = true;
                  setIsEdit(true);
                }}
              >
                <EditIcon sx={{ color: customTheme.craa?.palette.orange }} />
              </Button>
            ) : (
              <Button
                sx={{
                  border: 'none',
                  p: '0 !important',
                  mr: -0.5,
                  '&:hover': {
                    border: 'none',
                  },
                }}
                onClick={onClickEdit}
              >
                <SaveIcon sx={{ color: customTheme.craa?.palette.green }} />
              </Button>
            )}
            {isEdit ? (
              <Button
                sx={{
                  border: 'none',
                  p: '0 !important',
                  '&:hover': {
                    border: 'none',
                  },
                }}
                onClick={() => {
                  noteStore.disabled = false;
                  setIsEdit(false);
                }}
              >
                <ClearIcon sx={{ color: customTheme.craa?.palette.red }} />
              </Button>
            ) : (
              <Button
                sx={{
                  border: 'none',
                  p: '0 !important',
                  '&:hover': {
                    border: 'none',
                  },
                }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <DeleteIcon sx={{ color: customTheme.craa?.palette.red }} />
              </Button>
            )}
          </ButtonGroup>
        </Box>
        {/* <Typography variant="h6">{`[VP${note.viewport?.index! + 1}]${
          note.viewport?.simDoc?.title
        }`}</Typography> */}
        {/* <Divider /> */}
        {note.type == 'monitoring' ? (
          isEdit ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <TextField
                inputProps={{ maxLength: 300 }}
                fullWidth
                multiline
                maxRows={12}
                sx={{ p: 1.5 }}
                // state={note}
                // path="edit"
                value={editNote}
                className="note-input"
                onChange={(e: any) => {
                  setEditNote(e.target.value);
                  countInput(e.target.value);
                }}
              />
              <Box>
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
              </Box>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: '15px !important',
                lineHeight: 1.4,
                color: 'rgb(73, 73, 73)',
                p: 0.5,
                fontWeight: 500,
                pl: 1.3,
                width: '100%',
                wordBreak: 'break-word',
              }}
            >
              {highlightedText(note.text, noteStore.searchText)}
            </Typography>
          )
        ) : (
          <Box
            sx={{
              width: '100%',
              p: 1.5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 0.5,
                width: '100%',
              }}
            >
              <InputLabel
                sx={{
                  fontWeight: 500,
                }}
              >
                Number of capsules taken by subject
              </InputLabel>
              <InputBase
                state={note}
                path="complianceNote.taken"
                className="medication-input note-input"
                sx={{
                  width: '70px',
                }}
                disabled={!isEdit}
              />
            </Box>
            {note?.viewport?.simDoc?.kind! === 'StudyMedication' ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 0.5,
                  width: '100%',
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Number of capsules that should have been
                  <br /> taken by subject
                </InputLabel>
                <InputBase
                  className="medication-input note-input"
                  sx={{
                    width: '70px',
                  }}
                  state={note}
                  path="complianceNote.shouldTaken"
                  disabled={!isEdit}
                />
              </Box>
            ) : (
              <></>
            )}
            {note?.viewport?.simDoc?.kind! === 'StudyMedication' ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 0.5,
                  width: '100%',
                  position: 'relative',
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Percent(%) Compliance
                </InputLabel>
                <InputBase
                  state={note}
                  path="complianceNote.percent"
                  className="medication-input note-input"
                  disabled={!isEdit}
                  sx={{
                    width: '70px',
                  }}
                />
                <Typography
                  sx={{
                    position: 'absolute',
                    right: 5,
                    fontSize: '13.5px',
                    color: customTheme.craa?.palette.mainfont,
                  }}
                >
                  %
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        )}
      </CardContent>
      {/* <CardActions>
        <Stack
          direction={'row'}
          spacing={1}
          sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}
        >
          <Button
            onClick={onClickEdit}
            size="small"
            variant="contained"
            color="secondary"
          >
            Edit
          </Button>
          <Button
            onClick={onClickDelete}
            size="small"
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Stack>
      </CardActions> */}
    </Card>
  );
}
export default observer(CardView);
