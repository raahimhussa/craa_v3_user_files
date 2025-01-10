import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { CraaGridProps } from './Grid';

function GridView({ ...rest }: CraaGridProps) {
  return <Grid {...rest} />;
}
export default observer(GridView);
