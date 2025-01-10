import { AlertColor } from '@mui/material';

export type Dialog = {
  isVisible: boolean;
} & any;

export type AlertDialog = Dialog & {
  type: AlertColor;
  title: string;
  msg: string;
};
