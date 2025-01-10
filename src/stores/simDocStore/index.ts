import { makeAutoObservable, makeObservable, observable } from 'mobx';
import SimDoc from 'src/models/simDoc';
import { ISimDoc } from 'src/models/simDoc/simDoc.interface';
import SimDocRepository from 'src/repos/v1/simDoc';
import { RootStore } from '../root';
import Store from '../store';

export default class SimDocStore extends Store<ISimDoc> {
  simDocs: SimDoc[] = [];
  form: ISimDoc = {
    title: 'untitled Document',
    files: [],
    totalPage: 0,
    currentPage: 0,
    scale: 0,
    folderId: '',
    _id: undefined,
    id: 0,
    children: [],
    expanded: false,
    isDeleted: false,
    createdAt: 0,
    updatedAt: 0,
    kind: '',
    numberOfPillsPrescribed: 0,
    numberOfPillsTakenBySubject: 0,
    numberOfPillsToShow: 0,
    documentId: '',
  };
  constructor(store: RootStore, repository: SimDocRepository) {
    super(store, repository);
    makeObservable(this, {
      form: observable,
    });
  }
}
