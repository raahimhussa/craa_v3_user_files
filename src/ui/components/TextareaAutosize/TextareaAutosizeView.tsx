import { TextareaAutosize } from '@mui/material';
import { MobxUtil } from '@utils';
import { reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { TextareaAutosizeViewProps } from './TextareaAutosize';
function TextareaAutosizeView({
  style = {},
  state = {},
  path = '',
  ...rest
}: TextareaAutosizeViewProps) {
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

  const onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    localState.value = e.target.value;
  };

  const defaultStyle = {
    width: '100%',
    minHeight: 270,
    ...style,
  };

  return (
    <TextareaAutosize {...rest} style={defaultStyle} onChange={onChange} />
  );
}
export default observer(TextareaAutosizeView);
