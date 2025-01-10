import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { observer } from 'mobx-react';
import uniqid from 'uniqid';

function SelectView({
  variant = 'standard',
  label = '',
  helperText = '',
  items = countries,
  ...rest
}: any) {
  return (
    <FormControl fullWidth variant={variant}>
      <InputLabel>{label}</InputLabel>
      <Select {...rest} variant={variant}>
        {items.map(
          (item: {
            value: string | number | readonly string[] | undefined;
            code: string;
          }) => (
            <MenuItem key={uniqid() + item.value} value={item.value}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                alt={`Flag of ${item.value}`}
              />
            </MenuItem>
          )
        )}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
export default observer(SelectView);

const countries = [
  { code: 'AI', label: 'Anguilla', phone: '1-264', value: 'AI' },
  { code: 'AL', label: 'Albania', phone: '355', value: 'AL' },
  { code: 'AM', label: 'Armenia', phone: '374', value: 'AM' },
];
