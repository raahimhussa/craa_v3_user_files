import { Dialog } from '@components';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import Alert from 'src/ui/components/dialogs/Alert/Alert';

function DialogMount() {
  const { dialogStore } = useRootStore();

  const withDialog = (dialog: React.ReactNode, type: string) => {
    const isVisible = eval(`dialogStore.${type}.isVisible`);
    if (!isVisible) return null;
    return (
      <Dialog state={dialogStore} path={`${type}.isVisible`} open={isVisible}>
        {dialog}
      </Dialog>
    );
  };

  return <>{dialogStore.alert.isVisible && withDialog(<Alert />, 'alert')}</>;
}

export default observer(DialogMount);
