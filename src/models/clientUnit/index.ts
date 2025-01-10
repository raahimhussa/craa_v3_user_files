import { BusinessUnit, IClientUnit } from './clientUnit.interface';

import { makeAutoObservable } from 'mobx';

export default class ClientUnit {
  constructor() {
    makeAutoObservable(this);
  }
  _id: any;
  name!: string;
  authCode!: string;
  whitelist!: string[];
  businessUnits!: BusinessUnit[];

  date!: Date;
  isDeleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
