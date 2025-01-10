import { Edit } from '@mui/icons-material';
import { Box, CircularProgress, Fab, Alert, Snackbar } from '@mui/material';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import customTheme from 'src/ui/theme/customizedTheme';
function NoteButtonView() {
  const { modalStore, viewportStore, screenRecorderStore } = useRootStore();
  return (
    <>
      {screenRecorderStore.isVideoSaving ? (
        <Box
          sx={{
            width: 250,
            height: 30,
            right: 15,
            position: 'fixed',
            bottom: 35,
            zIndex: 1003,
            color: 'rgb(237, 108, 2) !important',
          }}
        >
          <Alert
            icon={
              <CircularProgress
                color="inherit"
                sx={{
                  width: '25px !important',
                  height: '25px !important',
                  color: 'rgb(237, 108, 2) !important',
                }}
              />
            }
            severity="warning"
          >
            Saving Datas..
          </Alert>
        </Box>
      ) : (
        <Fab
          className="note"
          sx={{
            width: 130,
            height: 50,
            right: 35,
            position: 'fixed',
            bottom: 40,
            zIndex: 1003,
            bgcolor: customTheme.craa?.palette.main,
            borderRadius: '8px !important',
            // boxShadow: '0 8px 16px 0 rgb(0 171 85 / 24%)',
            color: 'white',
            '&:hover': {
              bgcolor: customTheme.craa?.palette.dark,
              color: 'white !important',
            },
          }}
          variant="extended"
          onClick={() => {
            viewportStore.viewports[0].isDocOpen = false;
            viewportStore.viewports[1].isDocOpen = false;
            viewportStore.viewports[2].isDocOpen = false;
            modalStore.note.isVisible = !modalStore.note.isVisible;
          }}
        >
          NOTE
          <Edit
            sx={{
              ml: 1,
            }}
            fontSize="small"
          />
        </Fab>
      )}
    </>
  );
}
export default observer(NoteButtonView);
