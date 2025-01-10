import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { MobxUtil } from '@utils';
import { action, reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { ChangeEvent } from 'react';
function CheckboxView({
  left = false,
  center = false,
  right = false,
  label = '',
  state = {},
  path = '',
  ...rest
}: any) {
  const value = MobxUtil._get(state, path);

  const localState = useLocalObservable(() => ({
    value: value || false,
  }));

  reaction(
    () => localState.value,
    () => MobxUtil._set(state, path, localState.value)
  );

  reaction(
    () => MobxUtil._get(state, path),
    () => (localState.value = MobxUtil._get(state, path))
  );

  const onChange = action(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      localState.value = checked;
    }
  );

  let justifyContent = 'flex-start';
  if (center) {
    justifyContent = 'center';
  } else if (right) {
    justifyContent = 'flex-end';
  }

  return (
    <FormControlLabel
      {...rest}
      sx={{
        display: 'flex',
        justifyContent: justifyContent,
      }}
      control={
        <Checkbox {...rest} checked={localState.value} onChange={onChange} />
      }
      label={label}
    ></FormControlLabel>
  );
}

export default observer(CheckboxView);
