import { Alert, AlertTitle, Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Detector } from 'react-detect-offline';
import { useRootStore } from 'src/stores';
import { SimulationMode } from 'src/stores/ui';
import UserFollowup from 'src/ui/components/UserFollowup/UserFollowup';

function UserFollowupView() {
  const { uiState } = useRootStore()

  useEffect(() => {
    uiState.simulationMode = SimulationMode.Followup
  }, [])

  return (
    <Detector
      render={({ online }) => {
        return (
          <>
            {online ? (
              <UserFollowup />
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
export default observer(UserFollowupView);
