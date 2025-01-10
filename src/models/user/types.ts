export interface Profile {
  readonly userId: string;
  readonly countryId: string;
  readonly clientUnitId: string;
  readonly businessUnitId: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly status: UserStatus;
  readonly authCode: string;
  readonly isDeleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export enum UserStatus {
  Approval = 'approval',
  Dropout = 'dropout',
  Verified = 'verified',
}
