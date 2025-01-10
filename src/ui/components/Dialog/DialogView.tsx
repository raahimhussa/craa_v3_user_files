import { Button } from '@components';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { MobxUtil } from '@utils';
import _ from 'lodash';
import { reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { useRootStore } from 'src/stores';
function DialogView(props: any) {
  const { children, open, state, path } = props;
  const localState = useLocalObservable(() => ({
    open: open,
  }));

  reaction(
    () => localState.open,
    (newValue) => MobxUtil._set(state, path, newValue)
  );

  const onClose = () => (localState.open = false);
  const onBackdropClick = () => onClose();

  return (
    <Dialog open={localState.open} onBackdropClick={onBackdropClick}>
      <DialogContent sx={{ width: 300 }}>{children}</DialogContent>
      {/* <DialogActions>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions> */}
    </Dialog>
  );
}
export default observer(DialogView);
