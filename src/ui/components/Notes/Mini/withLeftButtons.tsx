import { getErrMsg, matchMutate } from '@utils';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
const withLeftButtons = (WrappedComponent: any) =>
  observer((props: any) => {
    const { noteRepository, state, matchMutate } = props;

    const leftButtons = [
      {
        title: 'ADD NOTE',
        onClick: async () => {
          const note = toJS(state.note);
          note.text = 'type your answer';
          try {
            await noteRepository.create(note);
            matchMutate('notes');
          } catch (error) {
            getErrMsg(error);
          }
        },
      },
    ];

    return (
      <WrappedComponent {...props} leftButtons={leftButtons} state={state} />
    );
  });

export default withLeftButtons;
