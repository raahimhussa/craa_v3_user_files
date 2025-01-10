import _ from 'lodash';
import { makeObservable, observable } from 'mobx';
import Identifiable from 'src/commons/interfaces/identifiable.interface';
import ISetting from 'src/models/setting/setting.interface';
import SettingRepository from 'src/repos/v2/setting';
import { RootStore } from '../root';
import Store from '../store';

export default class SettingStore extends Store<ISetting> {
  form: ISetting & Identifiable = {
    _id: null,
    kind: '',
    updatedAt: new Date(),
    isDeleted: false,
    createdAt: new Date(),
    firstScorerId: '',
    secondScorerId: '',
    adjudicatorId: '',
  };
  private _defaultForm: ISetting & Identifiable = _.cloneDeep(this.form);

  constructor(store: RootStore, repository: SettingRepository) {
    super(store, repository);
    makeObservable(this, {
      form: observable,
    });
  }

  get defaultForm(): ISetting & Identifiable {
    return this._defaultForm;
  }

  async getSetting(kind: string) {
    try {
      const { data: setting } = await this.repository.findOne({
        filter: { kind },
      });
      return setting;
    } catch (error) {
      throw error;
    }
  }
}
