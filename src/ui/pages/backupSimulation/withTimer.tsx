import { WrappingFunction } from '@shopify/react-compose';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import { useRootStore } from 'src/stores';

const withTimer: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { screenRecorderStore } = useRootStore();
    const initialTime = 60 * 1000 * 60 * 8; // initial time in milliseconds, defaults to 60000
    const interval = 1000; // interval to change remaining time amount, defaults to 1000
    const [timeLeft, { start, pause, resume, reset }] = useCountDown(
      initialTime,
      interval
    );

    useEffect(() => {
      screenRecorderStore.timer = {
        start,
        pause,
        resume,
        reset,
      };
      const setTime = action(() => {
        screenRecorderStore.timeLeft = timeLeft;
      });
      setTime();
    }, [timeLeft]);

    return <WrappedComponent {...props} />;
  });

export default withTimer;
