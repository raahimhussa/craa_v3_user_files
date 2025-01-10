import {
  Box,
  Button,
  ButtonGroup,
  InputLabel,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  DialogActions,
} from '@mui/material';
import { observer } from 'mobx-react';
import { AdminColumn, CellType } from '../../DataGrid/DataGrid';
import { useRootStore } from 'src/stores';
import InputBase from 'src/ui/components/InputBase/InputBase';
import customTheme from 'src/ui/theme/customizedTheme';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import Note from 'src/models/note';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Mode } from 'src/stores/noteStore/types';

const withColumns = (WrappedComponent: any) =>
  observer(({ ...rest }) => {
    const { noteStore } = useRootStore();

    useEffect(() => {
      noteStore.notes;
    }, [noteStore.selectedSimDoc]);

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

    const columns: Array<AdminColumn> = [
      {
        Header: 'VIEWPORT',
        accessor: 'viewport.index',
        maxWidth: 25,
        Cell: (cell: any) => {
          return <Box>{cell.row.original.viewport.index + 1}</Box>;
        },
      },
      {
        Header: 'PAGE',
        accessor: 'viewport.simDoc.currentPage',
        maxWidth: 20,
        Cell: (cell: any) => {
          return <Box>{cell.row.original.viewport.simDoc.currentPage + 1}</Box>;
        },
      },
      {
        Header: 'DOCUMENT',
        accessor: 'viewport.simDoc.title',
        // minWidth: 300,
        width: 60,
        Cell: (cell: any) => {
          return (
            <Typography
              sx={{
                fontSize: '15px !important',
                lineHeight: 1.4,
                color: 'rgb(73, 73, 73)',
                fontWeight: 500,
              }}
            >
              {highlightedText(
                cell.row.original.viewport.simDoc.title,
                noteStore.searchText
              )}
            </Typography>
          );
        },
      },
      {
        Header: 'NOTE',
        accessor: 'text',
        // collectionName: 'notes',
        // cellType: CellType.Editable,
        // minWidth: 500,
        Cell: (cell: any) => {
          const note = new Note(noteStore);
          note.load(cell.row.original);
          const { enqueueSnackbar } = useSnackbar();
          const [isEdit, setIsEdit] = useState(false);
          const [editNote, setEditNote] = useState(note.text);
          const [open, setOpen] = useState(false);
          const [inputLength, setInputLength] = useState(note.text.length);
          const countInput = (val: any) => {
            setInputLength(val.length);
          };

          const onClickEdit = async () => {
            note.edit = editNote;
            await note.save();
            note.text = editNote;
            noteStore.mode = Mode.Mini;
            noteStore.mode = Mode.Normal;
            setIsEdit(false);
            noteStore.disabled = false;
            // setDisabled(false);
            enqueueSnackbar('Edited!', { variant: 'success' });
          };

          const onClickDelete = async () => {
            await note.delete();
            enqueueSnackbar('Deleted!', { variant: 'success' });
          };
          if (cell.row.original.type == 'monitoring') {
            return (
              <Box
                sx={{
                  border: '1px solid black',
                  width: '100%',
                  borderColor: customTheme.craa?.palette.lightborder,
                  borderTop: 'none',
                  borderBottom: 'none',
                  p: 1,
                  minHeight: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
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
                  <DialogTitle id="alert-dialog-title">
                    {'Are you sure?'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Do you really want to delete the note? This process cannot
                      be undone.
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
                {isEdit ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      width: '100%',
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
                      fontWeight: 500,
                      width: 'calc(100% - 75px)',
                      wordBreak: 'break-word',
                    }}
                  >
                    {highlightedText(note.text, noteStore.searchText)}
                  </Typography>
                )}
                {/* {cell.row.original.text} */}
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
                        setInputLength(note.edit.length);
                        // setDisabled(true);
                        noteStore.disabled = true;
                        setIsEdit(true);
                      }}
                    >
                      <EditIcon
                        sx={{ color: customTheme.craa?.palette.orange }}
                      />
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
                      <SaveIcon
                        sx={{ color: customTheme.craa?.palette.green }}
                      />
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
                        // setDisabled(false);
                        noteStore.disabled = false;
                        setIsEdit(false);
                      }}
                    >
                      <ClearIcon
                        sx={{ color: customTheme.craa?.palette.red }}
                      />
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
                      <DeleteIcon
                        sx={{ color: customTheme.craa?.palette.red }}
                      />
                    </Button>
                  )}
                </ButtonGroup>
              </Box>
            );
          } else {
            return (
              <Box
                sx={{
                  border: '1px solid black',
                  width: '100%',
                  borderColor: customTheme.craa?.palette.lightborder,
                  borderTop: 'none',
                  borderBottom: 'none',
                  p: 1,
                  minHeight: '50px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
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
                  <DialogTitle id="alert-dialog-title">
                    {'Are you sure?'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Do you really want to delete the note? This process cannot
                      be undone.
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      mb: 0.5,
                      width: '100%',
                    }}
                  >
                    <InputLabel
                      sx={{
                        fontWeight: 400,
                        color: 'rgb(73, 73, 73)',
                      }}
                    >
                      Number of capsules taken by subject :
                    </InputLabel>
                    <InputBase
                      state={note}
                      path="complianceNote.taken"
                      className="medication-input note-input"
                      sx={{
                        width: '70px',
                        ml: 0.5,
                      }}
                      disabled={!isEdit}
                    />
                  </Box>
                  {cell.row.original.complianceNote.shouldTaken !== '' ? (
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
                          fontWeight: 400,
                          color: 'rgb(73, 73, 73)',
                        }}
                      >
                        Number of capsules that should have been taken by
                        subject :
                      </InputLabel>
                      <InputBase
                        state={note}
                        path="complianceNote.shouldTaken"
                        className="medication-input note-input"
                        sx={{
                          width: '70px',
                          ml: 0.5,
                        }}
                        disabled={!isEdit}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}
                  {cell.row.original.complianceNote.percent !== '' ? (
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
                          fontWeight: 400,
                          color: 'rgb(73, 73, 73)',
                        }}
                      >
                        Percent(%) Compliance :
                      </InputLabel>
                      <InputBase
                        state={note}
                        path="complianceNote.shouldTaken"
                        className="medication-input note-input"
                        sx={{
                          width: '70px',
                          ml: 0.5,
                        }}
                        disabled={!isEdit}
                      />
                      %
                    </Box>
                  ) : (
                    <></>
                  )}
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
                        setInputLength(note.edit.length);
                        // setDisabled(true);
                        setIsEdit(true);
                      }}
                    >
                      <EditIcon
                        sx={{ color: customTheme.craa?.palette.orange }}
                      />
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
                      <SaveIcon
                        sx={{ color: customTheme.craa?.palette.green }}
                      />
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
                        // setDisabled(false);
                        setIsEdit(false);
                      }}
                    >
                      <ClearIcon
                        sx={{ color: customTheme.craa?.palette.red }}
                      />
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
                      <DeleteIcon
                        sx={{ color: customTheme.craa?.palette.red }}
                      />
                    </Button>
                  )}
                </ButtonGroup>
              </Box>
            );
          }
        },
      },
    ];

    const meta = {
      columns,
    };

    return <WrappedComponent {...rest} {...meta} />;
  });

export default withColumns;
