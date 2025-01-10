import Box from '@mui/material/Box';
import ControlButton from './ControlButton/ControlButton';
import Copyright from '../Copyright/Copyright';
import Simulation from '../Simulation/Simulation';
import UserSimulation from 'src/models/userSimulation';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';

function UserFollowupView({
  userSimulation,
}: {
  userSimulation: UserSimulation;
  userSimulationMutate: any;
}) {
  // console.log('userSimulation', userSimulation)

  const { userSimulationStore } = useRootStore();

  const assessmentTypeId = userSimulationStore.userSimulation?.assessmentTypeId;

  return (
    <Box
      sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    >
      <ControlButton />
      <Simulation simulationId={userSimulation.simulationId} />
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        {/* <Copyright /> */}
      </Box>
    </Box>
  );
}
export default observer(UserFollowupView);
