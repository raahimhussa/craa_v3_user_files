import compose from '@shopify/react-compose';
import BoxView from './BoxView';
import { BoxProps as MuiBoxProps } from '@mui/material';
type BoxProps = MuiBoxProps & {};
export default compose<BoxProps>()(BoxView);
