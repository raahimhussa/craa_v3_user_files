import compose from '@shopify/react-compose';
import ProgressView from './ProgressView';
import { LinearProgressProps, CircularProgressProps } from '@mui/material';
export type ProgressProps = LinearProgressProps &
  CircularProgressProps & {
    linear?: boolean;
  };
export type HocComponentProps = {};
export type ProgressViewProps = ProgressProps & HocComponentProps;

export default compose<ProgressProps>()(ProgressView);
