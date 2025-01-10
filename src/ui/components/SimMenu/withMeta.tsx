import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';

const withMeta: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { matchMutate } = props;
    const { uiState, viewportStore, userSimulationStore, modalStore } =
      useRootStore();
    const leftButtons = [
      {
        text: 'add viewport',
        onClick: () => viewportStore.addViewport(),
        isVisible: true,
        class: 'addV',
      },
      {
        text: 'instructions',
        onClick: () => (modalStore.instruction.isVisible = true),
        isVisible: true,
        class: 'instructions',
      },
      // {
      //   text: 'review notes',
      //   onClick: () => alert('not yet'),
      //   isVisible: true
      // },
      // {
      //   text: 'calendar',
      //   onClick: () => alert('not yet'),
      //   isVisible: true
      // },
      // {
      //   text: 'ResetForTest',
      //   onClick: () => {
      //     userSimulationStore.userSimulation?.resetForTest();
      //     matchMutate('userSimulations');
      //   },
      //   isVisible: !uiState.isProduction,
      // },
      // {
      //   text: 'TimeSetting(For Test)',
      //   onClick: () => {
      //     userSimulationStore.userSimulation?.settingUsageTime(-10);
      //     matchMutate('userSimulations');
      //   },
      //   isVisible: !uiState.isProduction,
      // },
    ];

    const meta = {
      leftButtons,
    };
    return <WrappedComponent {...props} {...meta} />;
  });

export default withMeta;
