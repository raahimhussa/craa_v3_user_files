import { action, makeObservable, observable } from 'mobx';
import SimDocStore from 'src/stores/simDocStore';
import Model from '../model';
import { ISimDoc } from './simDoc.interface';

export default class SimDoc
  extends Model<ISimDoc, SimDocStore>
  implements ISimDoc
{
  _id: any = null;
  title: string = '';
  id: number = 0;
  files: any[] = [];
  folderId: string = '';
  children: any[] = [];
  expanded: boolean = false;
  isDeleted: boolean = false;
  createdAt: number = 0;
  updatedAt: number = 0;
  totalPage: number = 0;
  currentPage: number = 0;
  scale: number = 1;
  kind: string = '';
  numberOfPillsPrescribed: number = 0;
  numberOfPillsTakenBySubject: number = 0;
  numberOfPillsToShow: number = 0;
  documentId: string | null = null;

  constructor(store: SimDocStore, data: ISimDoc) {
    super(store, data);
    makeObservable(this, {
      _id: observable,
      title: observable,
      id: observable,
      files: observable,
      folderId: observable,
      children: observable,
      expanded: observable,
      isDeleted: observable,
      createdAt: observable,
      updatedAt: observable,
      totalPage: observable,
      currentPage: observable,
      scale: observable,
      kind: observable,
      numberOfPillsPrescribed: observable,
      numberOfPillsTakenBySubject: observable,
      numberOfPillsToShow: observable,
      asJson: action,
    });
    Object.assign(this, data);
  }

  asJson() {
    const form: ISimDoc = {
      _id: this._id,
      title: this.title,
      id: this.id,
      files: this.files,
      folderId: this.folderId,
      children: this.children,
      expanded: this.expanded,
      isDeleted: this.isDeleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      totalPage: this.totalPage,
      currentPage: this.currentPage,
      scale: this.scale,
      kind: this.kind,
      numberOfPillsPrescribed: this.numberOfPillsPrescribed,
      numberOfPillsTakenBySubject: this.numberOfPillsTakenBySubject,
      numberOfPillsToShow: this.numberOfPillsToShow,
      documentId: this.documentId,
    };
    return form;
  }
}
