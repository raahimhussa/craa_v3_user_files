import { makeObservable, observable } from 'mobx'
import IDomain from 'src/models/domain/domain.interface'
import DomainRepository from 'src/repos/v2/domainRepository'
import { RootStore } from '../root'
import Store from '../store'
import Identifiable from 'src/commons/interfaces/identifiable.interface'
import _ from 'lodash'

export default class DomainStore extends Store<IDomain> {
  form: IDomain & Identifiable = {
    _id: '',
    parentId: '',
    name: '',
    children: [],
  }
  defaultForm: IDomain & Identifiable = _.cloneDeep(this.form)

  constructor(rootStore: RootStore, repository: DomainRepository) {
    super(rootStore, repository)
    makeObservable(this, {
      form: observable,
    })
  }
}
