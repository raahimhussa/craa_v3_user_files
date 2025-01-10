import { RunCircle, WatchLater } from '@mui/icons-material';

import { BaselineStatus } from 'src/models/userSimulation/types';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { SimulationMode } from 'src/stores/ui';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';
import { useRouter } from 'next/router';
import { useTimer } from 'react-timer-hook';

function TimerView({}) {
  const {
    userSimulationStore: { userSimulation },
    assessmentTypeStore,
    uiState: { simulationMode },
    screenRecorderStore,
  } = useRootStore();

  const router = useRouter();

  // if (!assessmentTypeStore) return null;

  useEffect(() => {
    // console.log("Timer::useEffect userSimulation: ", userSimulation)
    userSimulation?.updateUsageTime();    
  }, []);

  const testTime = userSimulation?.testTime!;

  const expiryTimestamp = userSimulation?.expiryTimestamp(testTime);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seconds, minutes, hours, start, pause, resume } = useTimer({
    expiryTimestamp: expiryTimestamp!,
    onExpire: async () => {
      const isConfirm = await userSimulation?.expiredSubmit();
      if (isConfirm) {
        router.push('/home');
      }
    },
    autoStart: true,
  });

  const baselineHasNotStarted =
    userSimulation?.status === BaselineStatus.Assigned;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // if (!baselineHasNotStarted) {
    //   console.log('timer start');
    //   console.log(screenRecorderStore.mediaStream);
    //   userSimulation?.incUsageTime(1);
    // }
    if (screenRecorderStore.mediaStream !== null) {
      // userSimulation?.incUsageTime(1); //-- causes issues about reaching screen recording servers...commendted out for now
    }
  });

  useEffect(() => {
    const allotedTime = userSimulation?.testTime;

    if(allotedTime) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      const spentTime = allotedTime - totalSeconds;

      // console.log(spentTime)
      userSimulation?.syncUsageTime(spentTime);
    }
  }, [userSimulation, hours, minutes, seconds])

  if (!assessmentTypeStore) return null;

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
      }}
    >
      <Box
        className="ac"
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <RunCircle htmlColor="#4caf50" sx={{ fontSize: '1.2rem' }} />
        <Box
          sx={{
            ml: 1,
            color: '#4caf50',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {userSimulation?.attemptCount}
        </Box>
      </Box>
      <Button
        className="submit"
        sx={{
          mx: 2,
          // bgcolor: '#fbe9ec',
          color: 'rgb(183, 33, 54)',
          fontWeight: 700,
          borderRadius: '8px',
          fontSize: '0.8rem',
          boxShadow: 'none',
          px: '0.5rem',
          height: '20px',
          ml: 3,
          py: '11px !important',
          // border: 'none',
          '&:hover': {
            bgcolor: 'white',
            boxShadow: 'none',
            // border: 'none',
          },
        }}
        variant="outlined"
        onClick={async () => {
          pause();
          //@ts-ignore
          const result = await userSimulation?.submit();
          //@ts-ignore
          if (result !== 'submit') {
            resume();
          }
          // router.push('/home');
        }}
      >
        Submit
      </Button>
      <Box
        className="timer"
        component={'span'}
        sx={{
          fontSize: 20,
          position: 'relative',
          right: 0,
          display: 'flex',
          color: '#1976d2',
          alignItems: 'center',
        }}
      >
        <WatchLater sx={{ mr: 1, fontSize: '1.2rem' }} fontSize="medium" />
        <div style={{ minWidth: '92px', fontWeight: 700, fontSize: '1.1rem' }}>
          <span>{hours < 10 ? `0${hours}` : hours}</span>:
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
      </Box>
    </Box>
  );
}
export default observer(TimerView);
