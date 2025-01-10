import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { SimEvent } from 'src/models/log/types';
import Viewport from 'src/models/viewport';
import { useRootStore } from 'src/stores';
import ViewportStore from 'src/stores/viewportStore';
import ViewportPDF from '../ViewportPDF/ViewportPDF';
function PDFFrameView(props: any) {
  const {
    viewport,
  }: {
    viewport: Viewport;
  } = props;

  const { viewportStore, uiState } = useRootStore();

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        minWidth: '681px',
        width: '100%',
        px: viewport.index !== 2 ? '0.5rem' : 0,
        bgcolor: grey[700],
        position: 'relative',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: viewportStore.viewports[viewport.index]?.active
            ? 'block'
            : 'none',
          bgcolor: '#fbe9ec',
          color: 'rgb(183,33,54)',
          fontSize: '0.9rem',
          height: 25,
          fontWeight: 700,
          textAlign: 'center',
          verticalAlign: 'center',
          // mt: '-0.5rem',
          ml: '-0.5rem',
          position: 'sticky',
          zIndex: 2,
          width: '102%',
          top: 0,
        }}
      >
        {`Selected Viewport ${viewport.index + 1}`}
      </Box>
      <ViewportPDF viewport={viewport} />
    </Box>
  );
}
export default observer(PDFFrameView);
