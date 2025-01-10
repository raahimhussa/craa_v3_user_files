import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react';
function TypographyView({ sx, ...rest }: any) {
  return (
    <Typography
      {...rest}
      sx={{ whiteSpace: 'pre-line', textOverflow: 'ellipsis', ...sx }}
    />
  );
}
export default observer(TypographyView);
