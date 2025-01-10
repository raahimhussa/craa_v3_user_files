import { InputBase, InputBaseProps } from '@mui/material';
import { MobxUtil } from '@utils';
import { reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { ChangeEventHandler } from 'react';
function InputBaseView(props: InputBaseProps & { state: any; path: string }) {
  const { state, path } = props;

  const localState = useLocalObservable(() => ({
    value: MobxUtil._get(state, path),
  }));

  reaction(
    () => localState.value,
    () => MobxUtil._set(state, path, localState.value)
  );

  reaction(
    () => MobxUtil._get(state, path),
    () => (localState.value = MobxUtil._get(state, path))
  );

  const onChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = (e) => {
    localState.value = e.target.value;
  };

  return <InputBase {...props} onChange={onChange} value={localState.value} />;
}
export default observer(InputBaseView);
