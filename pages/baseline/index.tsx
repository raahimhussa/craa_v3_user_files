import Baseline from 'src/ui/pages/Simulation/Simulation';
import { NextPage } from 'next';
import { observer } from 'mobx-react';

const BaselinePageView: NextPage = () => {
  return <Baseline />;
};

export default observer(BaselinePageView);
