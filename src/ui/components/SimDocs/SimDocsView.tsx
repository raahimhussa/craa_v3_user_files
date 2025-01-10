import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Folder from 'src/models/folder';
import SimDoc from 'src/models/simDoc';
import Viewport from 'src/models/viewport';
import { useRootStore } from 'src/stores';
import Menu from '../Menu/Menu';

function SimDocsView({
  viewport,
  folders,
}: {
  viewport: Viewport;
  folders: any[];
}) {
  const { noteStore, viewportStore, simulationStore } = useRootStore();
  folders
    .sort(
      (a, b) =>
        simulationStore.simulation?.folderIds.indexOf(a._id)! -
        simulationStore.simulation?.folderIds.indexOf(b._id)!
    )
    .reverse();
  const buildSubItem = (folders?: Array<SimDoc | Folder> | undefined) =>
    folders?.map(buildItem);
  const buildItem: any = (item: SimDoc | Folder) => {
    const isFolder = item instanceof Folder;
    return {
      ...item,
      isFolder: isFolder,
      text: isFolder ? item.name : item.title,
      isViewedAll: isFolder
        ? item.children?.length == 1
          ? viewport.viewedSimDocIds.includes(item.children[0]._id)
          : viewport.viewedSimDocIds.length == item.children?.length
        : undefined,
      onClick: async () => {
        if (item instanceof SimDoc) {
          viewportStore.viewports[0].isDocOpen = false;
          viewportStore.viewports[1].isDocOpen = false;
          viewportStore.viewports[2].isDocOpen = false;
          const test = item.asJson();
          await viewport.selectSimDoc(toJS(test), viewport._id);
          await viewport.markSimDocAsViewed(
            toJS(test),
            viewport.userSimulationId
          );
        }
      },
      isViewed: viewport.viewedSimDocIds.includes(item._id),
      children: buildSubItem(item.children),
    };
  };

  const items: any = folders.map(buildItem);
  const viewedSimDocIds: any = viewport.viewedSimDocIds;
  noteStore.simDocs = items;

  return (
    <Menu items={items.reverse()} label="Select Document" viewport={viewport} />
  );
}
export default observer(SimDocsView);
