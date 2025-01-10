import IAgreement, {
  AgreementKind,
} from 'src/models/agreement/agreement.interface';
import { makeObservable, observable } from 'mobx';

import AgreementRepository from 'src/repos/v1/agreementRepository';
import ClientRepository from 'src/repos/v1/clientUnit';
import ClientUnitRepository from 'src/repos/v1/clientUnit';
import { IClientUnit } from 'src/models/clientUnit/clientUnit.interface';
import { RootStore } from '../root';
import Store from '../store';
import _ from 'lodash';
import identifiableInterface from 'src/commons/interfaces/identifiable.interface';

export default class ClientUnitStore extends Store<IClientUnit> {
  form: IClientUnit = {
    _id: '',
    name: '',
    authCode: '',
    whitelist: [],
    businessUnits: [],
  };
  defaultForm: IClientUnit & identifiableInterface = _.cloneDeep(this.form);

  constructor(store: RootStore, repository: ClientUnitRepository) {
    super(store, repository);
    makeObservable(this, {
      form: observable,
    });
  }
}
