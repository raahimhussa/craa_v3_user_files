import { GridProps as MuiGridProps } from '@mui/material';
import compose from '@shopify/react-compose';
import GridView from './GridView';

export type CraaGridProps = MuiGridProps & { df?: number };

export default compose<CraaGridProps>()(GridView);
