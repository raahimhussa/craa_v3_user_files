export default interface ISetting {
  kind: string;
  updatedAt: Date;
  isDeleted: boolean;
  createdAt: Date;
  firstScorerId: string;
  secondScorerId: string;
  adjudicatorId: string;
}
