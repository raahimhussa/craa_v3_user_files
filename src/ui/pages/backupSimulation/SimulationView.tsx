import { Backdrop, Button, Typography } from '@mui/material';
import { RunCircle, Start } from '@mui/icons-material';

import Box from '@mui/material/Box';
import Simulation from 'src/ui/components/Simulation/Simulation';
import { grey } from '@mui/material/colors';
import { observer } from 'mobx-react';

function SimulationView({ state }: { state: any }) {
  return (
    <Box>
      <Backdrop open={false}>
        <Box sx={{ bgcolor: grey[400], width: '100%', height: '100%' }}>
          <Button variant="outlined" sx={{ height: 80, width: 278 }}>
            <RunCircle fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h4">Start</Typography>
          </Button>
        </Box>
      </Backdrop>
      <Simulation />
    </Box>
  );
}

export default observer(SimulationView);
