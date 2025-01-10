import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
const withLeftButtons = (WrappedComponent: any) =>
  observer((props: any) => {
    const { state, notesMutate } = props;

    const { noteStore } = useRootStore();

    const leftButtons = [
      {
        title: 'ADD NOTE',
        onClick: async () => {
          noteStore.form.text = 'type your answer';
          await noteStore.addNote();
        },
      },
    ];

    return <WrappedComponent {...props} state={state} />;
  });

export default withLeftButtons;
