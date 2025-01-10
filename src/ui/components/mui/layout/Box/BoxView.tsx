import Box from '@mui/material/Box';
import { observer } from 'mobx-react';

function BoxView({ ...rest }: any) {
  return <Box {...rest} />;
}
export default observer(BoxView);
