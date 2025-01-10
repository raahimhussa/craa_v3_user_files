import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputBase,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import Viewport from 'src/models/viewport';

function PDFControllerView(props: any) {
  const {
    viewport,
  }: {
    viewport: Viewport;
  } = props;

  if (!viewport) {
    console.error('viewport not found!');
    return <></>;
  }

  return (
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
        <IconButton
          onClick={() => viewport.prevPage(viewport._id)}
          sx={{ p: 0 }}
        >
          <ArrowLeft htmlColor="white" />
        </IconButton>
        <IconButton
          onClick={() => viewport.nextPage(viewport._id)}
          sx={{ p: 0 }}
        >
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
      <Box sx={{ display: 'flex', ml: 2, alignItems: 'center' }}>
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
          onChange={(e) =>
            viewport.searchPage(parseInt(e.target.value), viewport._id)
          }
          value={
            viewport.simDoc?.currentPage ? viewport.simDoc.currentPage + 1 : 1
          }
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
          {viewport.simDoc?.totalPage || 0}
        </Box>
      </Box>

      <ButtonGroup sx={{ ml: 3, height: '20px', border: 'none' }} size="small">
        <Button
          onClick={() => viewport.scaleUp(viewport._id)}
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
        {/* <Button
          sx={{
            fontSize: '0.9rem',
            fontWeight: 700,
            border: 'none',
            '&:hover': {
              border: 'none',
            },
            color: 'white !important',
            p: '0 !important',
          }}
        >
          
        </Button> */}
        <Typography
          sx={{
            fontSize: '0.9rem',
            fontWeight: 700,
            width: '45px',
          }}
        >
          {viewport.tranformScaleToPercentage()} %
        </Typography>
        <Button
          onClick={() => viewport.scaleDown(viewport._id)}
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
  );
}

export default observer(PDFControllerView);
