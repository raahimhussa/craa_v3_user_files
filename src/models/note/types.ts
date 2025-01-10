import { IViewport } from '../viewport/viewport.interface';

export interface INote {
  _id: any;
  viewport: IViewport | null;
  text: string;
  userId: string;
  recordId: string;
  // duration: number;
  type: string;
  complianceNote: any;
  userSimulationId: string | undefined;
  isDeleted?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
