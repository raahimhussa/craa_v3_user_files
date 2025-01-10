import { makeAutoObservable } from 'mobx'
import IFolder from 'src/models/folder/folder.interface'
import FolderStore from 'src/stores/folderStore'
import SimDoc from '../simDoc'
import { IModel } from '../types'

export default class Folder implements IModel, IFolder {
  store: FolderStore
  _id: any
  name: string = ''
  depth: number = 0
  folderId: string = ''
  isDeleted: boolean = false
  createdAt: Date | null = null
  updatedAt: Date | null = null
  children: Array<SimDoc | Folder> | undefined
  expanded: any

  constructor(store: FolderStore, data: IFolder) {
    this.store = store
    makeAutoObservable(this, {
      store: false,
    })
    Object.assign(this, data)
  }

  load(data: any) {
    Object.assign(this, data)
  }
}
