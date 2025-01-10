import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { BaselineStatus } from 'src/models/folder/types';
import { useRootStore } from 'src/stores';
import ProductTour from '../ProductTour/ProductTour';
import SimMenu from '../SimMenu/SimMenu';
import Viewports from '../Viewports/Viewports';

function SimulationView(props: any) {
  const { userAssessmentCycleStore, userSimulationStore } = useRootStore();
  const { screenRecorderStore } = useRootStore();
  const [openTour, setOpenTour] = useState(false);
  screenRecorderStore.eventHandler;
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  } else {
    console.info('This page is not reloaded');
  }
  useEffect(() => {
    console.log('simulation view');
    // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    // } else {
    //   console.info('This page is not reloaded');
    // }
    // console.log();
    // if (
    //   //@ts-ignore
    //   !userAssessmentCycleStore.isViewportTour &&
    //   !props.userAssessmentCycles[0]?.isViewportTour &&
    //   userSimulationStore.userSimulation?.status! === BaselineStatus.InProgress
    // ) {
    //   setOpenTour(true);
    // }
  }, []);

  // when user open other tab
  // document.addEventListener('visibilitychange', () => {
  //   screenRecorderStore.stop(false);
  //   screenRecorderStore.isScreenrecording = false;
  //   screenRecorderStore.router.go('/home');
  // });

  return (
    <Grid container sx={{ height: '100%' }}>
      {/* <ProductTour
        type="viewport"
        setOpenTour={setOpenTour}
        openTour={openTour}
      /> */}
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <SimMenu />
        </Box>
      </Grid>
      <Viewports />
    </Grid>
  );
}
export default observer(SimulationView);
