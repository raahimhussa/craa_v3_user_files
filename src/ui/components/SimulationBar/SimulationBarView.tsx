import { Button } from '@components';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
function SimulationBarView({ simulation, onClick }: any) {
  const { routerStore } = useRootStore();
  // const onClick = () => {
  //   routerStore.go({
  //     pathname: 'simulations/[simulationId]',
  //     query: { simulationId: simulation._id, trainingId: training },
  //   })
  // }

  return (
    <TableRow onClick={onClick}>
      <TableCell sx={{ height: 48 }}>
        <Button style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {simulation?.title}
        </Button>
      </TableCell>
      <TableCell sx={{ height: 48 }}>
        {simulation?.complete ? 'complete' : ''}
      </TableCell>
    </TableRow>
  );
}
export default observer(SimulationBarView);
