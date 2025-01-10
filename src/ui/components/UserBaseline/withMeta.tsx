import { BaselineStatus } from 'src/models/userSimulation/types';
import { ControlButton } from './types';
import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
const withMeta: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const {
      userSimulation,
      onClickReStart,
      onClickResume,
      onClickStart,
      onClickPause,
      onClickSubmit,
    } = props;

    const open = userSimulation.status != BaselineStatus.InProgress;
    const disabled = !(userSimulation.status === BaselineStatus.InProgress);

    const controlButtons: ControlButton[] = [
      {
        text: 'Start',
        onClick: onClickStart,
        status: BaselineStatus.Assigned,
        open,
      },
      {
        text: 'Resume',
        onClick: onClickResume,
        status: BaselineStatus.PAUSE,
        open,
      },
      {
        text: 'Welcome ReStart!',
        onClick: onClickReStart,
        status: BaselineStatus.Stopped,
        open,
      },
    ];

    const menuItems = [
      {
        type: 'button',
        text: 'pause',
        onClick: onClickPause,
        disabled,
      },
      {
        type: 'text',
        render: () => <div></div>,
      },
      {
        type: 'button',
        text: 'Submit',
        onClick: onClickSubmit,
        disabled,
      },
    ];

    return (
      <WrappedComponent
        {...props}
        controlButtons={controlButtons}
        menuItems={menuItems}
      />
    );
  });

export default withMeta;
