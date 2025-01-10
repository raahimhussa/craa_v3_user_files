import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
function AlertView(props: any) {
  const { dialogStore } = useRootStore();
  return (
    <Alert severity={dialogStore.alert.type}>
      <AlertTitle>{dialogStore.alert.title}</AlertTitle>
      {dialogStore.alert.msg}
    </Alert>
  );
}
export default observer(AlertView);
