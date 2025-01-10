import { makeAutoObservable } from 'mobx'
import IDomain from 'src/models/domain/domain.interface'
import DomainStore from 'src/stores/domainStore'
import { IModel } from '../types'

export default class Domain implements IModel, IDomain {
  store: DomainStore
  _id?: any
  name: string = ''
  isDeleted?: boolean | undefined
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
  children: IDomain[] = []
  parentId!: string

  constructor(store: DomainStore, data: IDomain) {
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
