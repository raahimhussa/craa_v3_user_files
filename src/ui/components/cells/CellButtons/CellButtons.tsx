import { ButtonProps } from '@mui/material';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import CelButtonsView from './CellButtonsView';
export default compose<ButtonProps>(withMutate())(CelButtonsView);
