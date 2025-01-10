import { makeAutoObservable } from 'mobx';

export class ClientUnit {
  constructor() {
    makeAutoObservable(this);
  }
  _id!: string;
  name!: string;
  authCode!: string;
  whitelist!: Array<string>;
  businessUnits!: BusinessUnit[];
  isDeleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class BusinessUnit {
  constructor() {
    makeAutoObservable(this);
  }
  _id!: string;
  name!: string;
  countryIds!: string[];
  adminCountryIds!: string[];
  businessCycles!: BusinessCycle[];
}

export class BusinessCycle {
  constructor() {
    makeAutoObservable(this);
  }
  _id!: string;
  assessmentCycleId!: string;
  settingsByDomainIds!: SettingsByDomainId[];
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  isScreenRecordingOn?: boolean;
}

export class SettingsByDomainId {
  constructor() {
    makeAutoObservable(this);
  }
  domainId!: string;
  minScore!: number;
}

export interface IClientUnit {
  _id: any;
  name: string;
  authCode: string;
  whitelist: Array<string>;
  businessUnits: BusinessUnit[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
