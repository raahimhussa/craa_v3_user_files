import { Box, Button, Modal, Typography } from '@mui/material';

import { BaselineStatus } from 'src/models/userSimulation/types';
import { RunCircle } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';

function ControlButtonView({}: {}) {
  const { userSimulationStore, screenRecorderStore } = useRootStore();
  return null;
  // const {
  //   userSimulation: { controlButton, status },
  // } = userSimulationStore;
  // // console.log('status', status)
  // return (
  //   <Modal
  //     BackdropProps={{
  //       sx: {
  //         background: (theme) => theme.craa?.palette.mainGradiant,
  //       },
  //     }}
  //     // open={status === BaselineStatus.HasNotStarted}
  //     open={status === BaselineStatus.HasNotStarted}
  //   >
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         flex: 1,
  //         width: '100%',
  //         height: '100%',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <Button
  //         onClick={() => screenRecorderStore.start()}
  //         variant="outlined"
  //         sx={{
  //           height: 80,
  //           width: 278,
  //         }}
  //       >
  //         <RunCircle fontSize="large" sx={{ mr: 1 }} />
  //         <Typography variant="h4">{controlButton?.text}</Typography>
  //       </Button>
  //     </Box>
  //   </Modal>
  // );
}
export default observer(ControlButtonView);
