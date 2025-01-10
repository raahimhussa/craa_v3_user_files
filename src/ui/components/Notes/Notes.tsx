import AuthStore from 'src/stores/authStore';
import NotesView from './NotesView';
import UserBaselineStore from 'src/stores/userSimulationStore';
import compose from '@shopify/react-compose';
import withDraggable from 'src/hocs/withDraggable';
import { withFind } from '@hocs';
import withStore from 'src/hocs/withStore';
import UserSimulationStore from 'src/stores/userSimulationStore';

const getNotesFilter = ({
  userSimulationStore: { userSimulation },
  authStore: { user },
}: {
  userSimulationStore: UserSimulationStore;
  authStore: AuthStore;
}) => ({
  userId: user._id,
  'viewport.userSimulationId': userSimulation?._id,
  isDeleted: false,
});

export default compose<any>(
  withStore('userSimulationStore'),
  withStore('authStore'),
  withStore('viewportStore'),
  withFind({
    collectionName: 'notes',
    version: 2,
    getFilter: getNotesFilter,
    getOptions: () => ({
      sort: {
        createdAt: -1,
      },
    }),
    storeKey: 'noteStore',
  }),
  withDraggable({ title: 'Notes', kind: 'note' })
)(NotesView);
