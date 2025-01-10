import { makeAutoObservable } from 'mobx';
import CommonDAO from 'src/commons/interfaces/commonDAO.interface';
import Identifiable from 'src/commons/interfaces/identifiable.interface';
import SettingStore from 'src/stores/settingStore';
import ISetting from './setting.interface';

export default class Setting implements ISetting, Identifiable, CommonDAO {
  store;
  constructor(store: SettingStore, data: ISetting) {
    this.store = store;
    makeAutoObservable(this, {
      store: false,
    });
    Object.assign(this, data);
  }
  _id: string | null = null;
  kind: string = 'ScorerSetting';
  firstScorerId: string = '';
  secondScorerId: string = '';
  adjudicatorId: string = '';
  updatedAt: Date = new Date();
  isDeleted: boolean = false;
  createdAt: Date = new Date();

  get asJson() {
    return {
      _id: this._id,
      kind: this.kind,
      firstScorerId: this.firstScorerId,
      secondScorerId: this.secondScorerId,
      adjudicatorId: this.adjudicatorId,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      createdAt: this.createdAt,
    };
  }
}
