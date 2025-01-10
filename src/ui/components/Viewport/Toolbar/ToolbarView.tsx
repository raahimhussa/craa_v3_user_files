import '@szhsin/react-menu/dist/index.css';

import { Cancel, Close, Fullscreen, FullscreenExit } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import PDFController from '../../PDFController/PDFController';
import SimDocs from '../../SimDocs/SimDocs';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';

function ToolbarView({ onClickCancel, viewport, pdfController = true }: any) {
  const { viewportStore } = useRootStore();

  const expander = viewportStore.isFullscreen ? (
    <IconButton onClick={() => viewport.closeFullscreen(viewport.index)}>
      <FullscreenExit htmlColor="white" fontSize="medium" />
    </IconButton>
  ) : (
    <IconButton
      onClick={() => viewport.fullscreen(viewport._id, viewport.index)}
    >
      <Fullscreen htmlColor="white" fontSize="medium" />
    </IconButton>
  );
  if (!viewport) return null;
  return (
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
        <SimDocs viewport={viewport} />
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
            {viewport?.simDoc?.title}
          </Typography>
          {pdfController && <PDFController viewport={viewport} />}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', height: 56 }}>
          {viewport.index != 2 && expander}
          {/* {viewport.index != 2 && expander} */}
          {viewport.index == 2 ? (
            <IconButton onClick={() => onClickCancel(viewport)}>
              <Close htmlColor="white" fontSize="medium" />
            </IconButton>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default observer(ToolbarView);
