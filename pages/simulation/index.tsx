import { observer } from 'mobx-react';
import { NextPage } from 'next';
import Simulation from 'src/ui/pages/backupSimulation/Simulation';

const SimulationPageView: NextPage = () => {
  return <Simulation />
}

export default observer(SimulationPageView);
