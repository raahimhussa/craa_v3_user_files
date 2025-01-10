import { BaselineStatus } from 'src/models/userSimulation/types';

export interface ControlButton {
  text: string;
  onClick: () => void;
  status: BaselineStatus;
  open: boolean;
}
