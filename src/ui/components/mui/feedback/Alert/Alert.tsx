import compose from '@shopify/react-compose';
import AlertView from './AlertView';
import { AlertProps as MuiAlertProps } from '@mui/material';

export type AlertProps = MuiAlertProps;

export default compose<AlertProps>()(AlertView);
