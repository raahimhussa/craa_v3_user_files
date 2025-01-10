import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
function StackView({ ...rest }: any) {
  return <Stack {...rest} />;
}
export default observer(StackView);
