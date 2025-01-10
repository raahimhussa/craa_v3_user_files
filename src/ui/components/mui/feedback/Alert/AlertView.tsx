import { Alert } from '@mui/material';
import { observer } from 'mobx-react';
function AlertView({ ...rest }: any) {
  return (
    <>
      <Alert {...rest} />
    </>
  );
}
export default observer(AlertView);
