import { Alert, AlertTitle, Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import { Detector } from 'react-detect-offline';
import { SimulationMode } from 'src/stores/ui';
import UserBaseline from 'src/ui/components/UserBaseline/UserBaseline';
import { Utils } from '@utils';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useRootStore } from 'src/stores';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SimEvent } from 'src/models/log/types';

function SimulationView({ userSimulationId }: { userSimulationId: string }) {
  const {
    authStore,
    uiState,
    userSimulationStore,
    routerStore,
    screenRecorderStore,
    viewportStore,
    logStore,
    fileStore,
    uiState: { userSimulation, baselineCard },
  } = useRootStore();
  const isServer = Utils.isServer();

  useEffect(() => {
    uiState.simulationMode = SimulationMode.Baseline;

    const isRefreshing = localStorage.getItem('refreshing') === 'true';

    if (isRefreshing) {
      // Perform actions after the page is refreshed
      localStorage.removeItem('refreshing');
      routerStore.go('/home');
      baselineCard.mutate && baselineCard.mutate();
      userSimulation.mutate && userSimulation.mutate();
      // location.reload();
      // Clear the stored value
    }

    // Function to be executed before page refresh
    const handleBeforeUnload = (event: any) => {
      // Perform actions before page refresh
      event.preventDefault();
      localStorage.setItem('refreshing', 'true');

      // return 'Are you sure you want to refresh the page?';
      // Optionally, you can prompt a confirmation message to the user
      event.returnValue = false; // This line is necessary for Chrome
    };
    const handleUnload = (event: any) => {
      // Perform actions before page refresh
      event.preventDefault();
      const isRefreshing = localStorage.getItem('refreshing') === 'true';
      if (isRefreshing) {
        // You can add your code logic here
        screenRecorderStore.stop(true);

        viewportStore.viewports[2].active = false;
        viewportStore.viewportRepository.update({
          filter: {
            _id: viewportStore.viewports[2]._id,
          },
          update: {
            active: false,
          },
        });
        logStore.create(SimEvent.OnClickRefresh);
        logStore.create(SimEvent.OnClickHome);
      }
    };

    // Attach the event listener for beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    return () => {
      // Cleanup by removing the event listener
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <Detector
      render={({ online }) => {
        return (
          <>
            {online ? (
              <UserBaseline
                userSimulationId={userSimulationId}
                user={authStore.user}
              />
            ) : (
              <Backdrop open={true}>
                <Box sx={{ bgcolor: 'white', boxShadow: 10 }}>
                  <Alert severity="error">
                    <AlertTitle>
                      You have lost connection to CRAA servers. If you
                      experience frequent internet connection issues, please try
                      the following tips:
                    </AlertTitle>
                    <ol>
                      <li>
                        You have lost connection to CRAA servers. If you
                        experience frequent internet connection issues, please
                        try the following tips:
                      </li>
                      <li>Use a wired connection.</li>
                      <li>
                        Reset your modem or call your Internet Service Provider
                        and request a reset.
                      </li>
                      <li>Disable your VPN (if applicable).</li>
                      <li>Close all other programs on your computer.</li>
                      <li>Restart your computer.</li>
                      <li>
                        Check if anyone is using the same internet connection,
                        ask that they stop using the internet while you complete
                        the simulation.
                      </li>
                    </ol>
                  </Alert>
                </Box>
              </Backdrop>
            )}
          </>
        );
      }}
    />
  );
}
export default observer(SimulationView);
