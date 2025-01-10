import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react';
const LoadingView = () => {
  return (
    <Box
      sx={{
        background: (theme) => theme.craa?.palette.mainGradiant,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress sx={{ color: 'white' }} />
    </Box>
  );
}

export default observer(LoadingView);
