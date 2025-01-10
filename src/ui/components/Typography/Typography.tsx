import compose from '@shopify/react-compose';
import TypographyView from './TypographyView';
import { TypographyProps as MuiTypographyProps } from '@mui/material';

export type TypographyProps = MuiTypographyProps & {};

export default compose<TypographyProps>()(TypographyView);
