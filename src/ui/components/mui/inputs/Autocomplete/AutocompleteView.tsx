import { Autocomplete, TextField } from '@mui/material';
import { MobxUtil } from '@utils';
import { reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
function AutocompleteView(props: any) {
  const {
    state = {},
    path = '',
    label = 'label',
    helperText = 'helperText',
    options = [],
    multiple = true,
  } = props;

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

  const getOptionLabel = (option: any) => {
    return option.text;
  };
  const onChange = (event: any, selectedOptions: any) => {
    if (multiple) {
      const selectedValues = selectedOptions.map((option: any) => option.value);
      localState.value.replace(selectedValues);
    } else {
      localState.value = selectedOptions?.value;
    }
  };
  return (
    <Autocomplete
      {...props}
      multiple={multiple}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={'outlined'}
          value={!multiple ? localState.value : ''}
        />
      )}
    />
  );
}
export default observer(AutocompleteView);
