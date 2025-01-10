import { ArrowBack, ArrowForward, SafetyDivider } from '@mui/icons-material';
import { Box, Divider, InputBase } from '@mui/material';
import { grey } from '@mui/material/colors';
import { observer } from 'mobx-react';
function PageControl({}: {}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 64,
          justifyContent: 'space-between',
        }}
      >
        <ArrowBack htmlColor="white" />
        <ArrowForward htmlColor="white" />
      </Box>
      <Box sx={{ display: 'flex', ml: 2 }}>
        <InputBase
          sx={{
            color: 'white',
            bgcolor: 'black',
            width: 32,
            height: 32,
          }}
        />
        <InputBase disabled={true} />
      </Box>
    </Box>
  );
}
export default observer(PageControl);
