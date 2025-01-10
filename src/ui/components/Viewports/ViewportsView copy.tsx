import { observer } from 'mobx-react';
import { Spacer } from '@components';
import Viewport from '../Viewport/Viewport';
import Toolbar from '../Viewport/Toolbar/Toolbar';
import uniqid from 'uniqid';
import IViewport from 'src/models/viewport';
import { Box, Button, Divider, Typography } from '@mui/material';
import _ from 'lodash';
import { useRootStore } from 'src/stores';
import Draggable from 'react-draggable';
import NoteButton from '../NoteButton/NoteButton';
import Note from '../Notes/Notes';

function ViewportsView() {
  const { viewportStore, uiState } = useRootStore();

  if (viewportStore.getMountedViewportCount() === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          height: uiState.windowDimensions.height,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#525659',
          flexDirection: 'column',
        }}
      >
        <Typography color={'white'} variant="h3">
          CRA Assessments
        </Typography>
        <Spacer spacing={2} />
        <Button
          size='large'
          variant='outlined'
          onClick={() => viewportStore.addViewport()}>ADD Viewport</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flex: 1 }}>
      {viewportStore.mountedViewports()?.map((viewport: IViewport) => {
        const isModal = viewport.index === 2
        if (isModal) return null
        return (
          <Box key={uniqid()} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Toolbar viewport={viewport} />
            <Divider sx={{ bgcolor: 'white' }} />
            <Viewport viewport={viewport} />
          </Box>
        );
      })}
      <NoteButton />
      <Note />
      {viewportStore.viewports[2].isMounted && (
        <Draggable bounds="parent" grid={[25, 25]}>
          <Box
            sx={{
              width: 500,
              height: 750,
              position: 'absolute',
              bottom: 0,
              zIndex: 1004,
              overflow: 'scroll',
              resize: 'vertical',
            }}
          >
            <Toolbar viewport={viewportStore.viewports[2]} />
            <Divider sx={{ bgcolor: 'white' }} />
            <Viewport viewport={viewportStore.viewports[2]} />
          </Box>
        </Draggable>
      )}
    </Box>
  );
}
export default observer(ViewportsView);
