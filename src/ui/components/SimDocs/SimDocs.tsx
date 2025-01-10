import { withFind } from '@hocs';
import compose from '@shopify/react-compose';
import withStore from 'src/hocs/withStore';
import SimulationStore from 'src/stores/simulationStore';
import SimDocsView from './SimDocsView';
import withProps from './withProps';
const getFoldersFilter = ({
  simulationStore,
}: {
  simulationStore: SimulationStore;
}) => {
  const folderIds = simulationStore.simulation?.folderIds;
  return {
    _id: {
      $in: folderIds,
    },
    isDeleted: false,
    isActivated: true,
  };
};

const getSubFoldersFilter = ({
  simulationStore,
}: {
  simulationStore: SimulationStore;
}) => {
  const folderIds = simulationStore.simulation?.folderIds;
  return {
    folderId: {
      $in: folderIds,
    },
    depth: 1,
    isDeleted: false,
    isActivated: true,
  };
};

const getSubSimDocsFilter = ({ subFolders }: { subFolders: any[] }) => {
  const folderIds = subFolders.map((folder) => folder._id);
  return {
    folderId: {
      $in: folderIds,
    },
    isDeleted: false,
    isActivated: true,
  };
};

export default compose<any>(
  withStore('simulationStore'),
  withFind({
    collectionName: 'folders',
    version: 2,
    getFilter: getFoldersFilter,
  }),
  withFind({
    collectionName: 'folders',
    version: 2,
    getFilter: getSubFoldersFilter,
    propName: 'subFolders',
  }),
  withFind({
    collectionName: 'simDocs',
    getFilter: getSubFoldersFilter,
    // storeKey: 'simDocStore'
  }),
  withFind({
    collectionName: 'simDocs',
    getFilter: getSubSimDocsFilter,
    // storeKey: 'simDocStore',
    propName: 'subSimDocs',
  }),
  withProps
)(SimDocsView);
