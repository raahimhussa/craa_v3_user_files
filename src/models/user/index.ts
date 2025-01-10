import { makeAutoObservable } from 'mobx';
import { Profile } from './types';

export default class User {
  readonly _id!: any;
  email!: string;
  name!: string;
  password!: string;
  roleId!: string;
  profiles!: Profile;
  isDeleted!: boolean;
  updatedAt!: Date;
  createdAt!: Date;

  constructor() {
    makeAutoObservable(this);
  }
}
