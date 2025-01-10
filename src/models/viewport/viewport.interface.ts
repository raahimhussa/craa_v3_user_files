import { ISimDoc } from '../simDoc/simDoc.interface';
export interface IViewport {
  _id: any;

  active: boolean;

  index: number;

  userId: string;

  simulationId: string;

  userSimulationId: string;

  simDoc: ISimDoc | null;

  viewedSimDocIds: Array<number>;

  isMounted: boolean;

  isDeleted: boolean;

  createdAt: number;

  updatedAt: number;
}
