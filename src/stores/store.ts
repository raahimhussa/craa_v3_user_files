import { flow, makeObservable, toJS } from 'mobx';
import Identifiable from 'src/commons/interfaces/identifiable.interface';
import Repository from 'src/repos/repository';
import { RootStore } from './root';

export default class Store<D> {
  rootStore: RootStore;
  repository: Repository<D>;
  form!: D & Identifiable;

  constructor(rootStore: RootStore, repository: Repository<D>) {
    this.rootStore = rootStore;
    this.repository = repository;
    makeObservable(this, {
      create: flow,
      update: flow,
      delete: flow,
    });
  }

  *create() {
    console.info('create', toJS(this.form));
    yield this.repository.create(this.form);
  }

  *update() {
    console.info('update', toJS(this.form));
    yield this.repository.update({
      filter: { _id: this.form._id },
      update: this.form,
    });
  }

  *delete() {
    console.info('delete');
    yield this.repository.delete({
      filter: { _id: this.form._id },
      update: { isDeleted: true },
    });
  }
}
