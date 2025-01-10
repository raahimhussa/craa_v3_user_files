import { makeObservable, observable } from 'mobx';
import AgreementStore from 'src/stores/agreementStore';
import Model from '../model';
import IAgreement, { AgreementKind } from './agreement.interface';

export class Agreement
  extends Model<IAgreement, AgreementStore>
  implements IAgreement
{
  constructor(store: AgreementStore, data: IAgreement) {
    super(store, data);
    makeObservable(this, {
      _id: observable,
      key: observable,
      kind: observable,
      label: observable,
      htmlContent: observable,
      isRequired: observable,
      isDeleted: observable,
      createdAt: observable,
      updatedAt: observable,
    });
  }
  _id: any = null;
  kind: AgreementKind = AgreementKind.PrivacyPolicy;
  key: string = '';
  label: string = '';
  htmlContent: string = '';
  isRequired: boolean = false;
  isDeleted: boolean = false;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
