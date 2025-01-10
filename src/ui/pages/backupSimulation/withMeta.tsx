import { Button } from '@components';
import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import ProfileCard from 'src/ui/components/Header/ProfileCard/ProfileCard';
import uniqid from 'uniqid';
import {
  AppBarItem,
  AppBarItems,
} from 'src/ui/components/mui/surfaces/AppBar/AppBar';
import { useRootStore } from 'src/stores';
import _ from 'lodash';
import { Pause } from '@mui/icons-material';
import { ScreenRecorderStatus } from 'src/stores/screenRecorderStore/types';

const withMeta: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { Timer, simulation } = props;
    const { screenRecorderStore } = useRootStore();

    const renderItem = (item: AppBarItem) => {
      return (
        <Button
          key={uniqid()}
          sx={{ mr: 2 }}
          fullWidth={false}
          onClick={item.onClick}
          variant="outlined"
        >
          {item.text}
        </Button>
      );
    };

    const buttons = [
      {
        text: 'Resume',
        onClick: () => screenRecorderStore.resume(),
        status: ScreenRecorderStatus.Pause,
        icon: <Pause />,
      },
      {
        text: 'Pause',
        onClick: () => screenRecorderStore.pause(),
        status: ScreenRecorderStatus.Resume,
        icon: <Pause />,
      },
      {
        text: 'Pause',
        onClick: () => screenRecorderStore.pause(),
        status: ScreenRecorderStatus.Start,
        icon: <Pause />,
      },
      {
        text: 'Pause',
        onClick: () => screenRecorderStore.pause(),
        status: ScreenRecorderStatus.Idle,
        icon: <Pause />,
      },
      {
        text: 'complete',
        onClick: () => screenRecorderStore.pause(),
        status: ScreenRecorderStatus.Stop,
        disabled: true,
      },
    ];

    const button: any = buttons.find(
      (button) => button.status === screenRecorderStore.status
    );

    const screenRecorder = {
      controlPlane: {
        leftButton: button,
        getTimer: () => <Timer initialTime={simulation.initialTime} />,
        rightButton: {
          text: 'Submit',
          onClick: () => screenRecorderStore.stop(true),
        },
      },
    };

    const appBarItems: AppBarItems = {
      left: [
        {
          text: 'ADD A VIEWPORT',
          onClick: () => alert('inProgres..'),
          renderItem,
        },
        {
          text: 'Instructions',
          onClick: () => alert('inProgres..'),
          renderItem,
        },
        // {
        //   text: 'Review Notes',
        //   onClick: () => alert('inProgres..'),
        //   renderItem,
        // },
        // {
        //   text: 'Calendar',
        //   onClick: () => alert('inProgres..'),
        //   renderItem,
        // },
      ],
      center: [
        {
          renderItem: () => null,
        },
      ],
      right: [
        {
          text: '',
          onClick: () => alert('inProgres..'),
          renderItem: () => <ProfileCard />,
        },
      ],
    };

    return (
      <WrappedComponent
        {...props}
        appBarItems={appBarItems}
        screenRecorder={screenRecorder}
      />
    );
  });

export default withMeta;
