import { WrappingFunction } from "@shopify/react-compose";
import { observer } from "mobx-react";
import Folder from "src/models/folder";
import SimDoc from "src/models/simDoc";
import { ISimDoc } from "src/models/simDoc/simDoc.interface";
import { useRootStore } from "src/stores";

const withProps: WrappingFunction = (WrappedComponent) => observer((props) => {
  const {
    folders,
    simDocs,
    subFolders,
    subSimDocs
  }: {
    subFolders: Array<any>
    subSimDocs: Array<ISimDoc>
    simDocs: Array<ISimDoc>
    folders: Array<any>
  } = props
  const { simDocStore, folderStore } = useRootStore()
  const rawFolders = {
    0: folders,
    1: subFolders,
  }
  // console.log('subSimDocs', subSimDocs)
  rawFolders[1].forEach(folder_1 => {
    folder_1.children = []
    // console.log('folder_1', folder_1)
    folder_1.children = folder_1.children?.concat(subSimDocs
      .filter((simDoc) => simDoc.folderId === folder_1._id)
      .map((simDoc) => {
        // console.log('subSimDoc', simDoc)
        return new SimDoc(simDocStore, simDoc)
      })
    )
    // console.log('folder_1.children', folder_1.children)
  })

  const _folders = rawFolders[0].map(folder_0 => {
    folder_0.children = rawFolders[1]
      .filter(folder => folder.folderId === folder_0._id)
      .map(folder => new Folder(folderStore, folder))
    folder_0.children = folder_0.children
      .concat(simDocs
        .filter(simDoc => simDoc.folderId === folder_0._id)
        .map(simDoc => new SimDoc(simDocStore, simDoc)
        )
      )
    return folder_0
  }).map(folder_0 => new Folder(folderStore, folder_0))

  // console.log(_folders, 'folder')
  return <WrappedComponent {...props} folders={_folders} />
})
export default withProps