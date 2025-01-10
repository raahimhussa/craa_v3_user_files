import Box from '@mui/material/Box';
import ControlButton from './ControlButton/ControlButton';
import Copyright from '../Copyright/Copyright';
import Simulation from '../Simulation/Simulation';
import UserSimulation from 'src/models/userSimulation';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';

function UserBaselineView({
  userSimulation,
  userSimulationMutate,
  isScreenrecording,
}: {
  userSimulation: UserSimulation;
  userSimulationMutate: any;
  isScreenrecording: boolean;
}) {
  const {
    userSimulationStore,
    // uiState: { userSimulation },
  } = useRootStore();
  // const assessmentTypeId = userSimulationStore.userSimulation?.assessmentTypeId;
  // useEffect(() => {
  //   userSimulation.mutate = userSimulationMutate;
  // }, [userSimulationMutate]);
  console.log(userSimulation.simulationId);
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
export default observer(UserBaselineView);
