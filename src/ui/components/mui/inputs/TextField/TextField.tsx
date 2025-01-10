import { TextField, TextFieldProps } from '@mui/material';
import { action, reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { useRef } from 'react';
import { MobxUtil } from 'src/utils';
function TextFieldView({
  editable = true,
  onChange,
  state = {},
  path = '',
  defaultValue = '',
  variant = 'standard',
  inputProps = {},
  ...rest
}: TextFieldProps & {
  state: any;
  path: string;
  editable: boolean;
  inputProps: any;
} & any) {
  const localState = useLocalObservable(() => ({
    value: MobxUtil._get(state, path) || defaultValue,
  }));

  reaction(
    () => localState.value,
    () => MobxUtil._set(state, path, localState.value)
  );

  reaction(
    () => MobxUtil._get(state, path),
    () => (localState.value = MobxUtil._get(state, path))
  );

  const _onChange = action((e: { target: { value: any } }) => {
    if (editable) {
      localState.value = e.target.value;
      if (onChange) {
        onChange(e.target.value);
      }
    }
  });

  return (
    <TextField
      {...rest}
      variant={variant}
      fullWidth
      onChange={_onChange}
      value={localState.value}
      inputProps={inputProps}
    />
  );
}

export default observer(TextFieldView);
