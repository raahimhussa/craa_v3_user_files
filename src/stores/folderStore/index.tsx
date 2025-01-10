import { makeObservable, observable } from 'mobx'
import Identifiable from 'src/commons/interfaces/identifiable.interface'
import IFolder from 'src/models/folder/folder.interface'
import FolderRepository from 'src/repos/v2/folder'
import { RootStore } from '../root'
import Store from '../store'

export default class FolderStore extends Store<IFolder> {
  mutate: any
  form: IFolder & Identifiable = {
    _id: null,
    name: 'untitled folder',
    depth: 0,
    children: [],
    folderId: null,
    expanded: true,
  }

  constructor(rootStore: RootStore, repository: FolderRepository) {
    super(rootStore, repository)
    makeObservable(this, {
      form: observable
    })
  }
}
