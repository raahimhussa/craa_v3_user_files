import { observer } from 'mobx-react';
import { WrappingFunction } from '@shopify/react-compose';
import Box from '@mui/material/Box';
import { useMeasure } from 'react-use';
const withResizable: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const [ref, data] = useMeasure();

    const _props = {
      ...data,
    };

    return (
      <Box
        ref={ref}
        sx={{
          resize: 'both',
          bgcolor: 'white',
        }}
      >
        <WrappedComponent {...props} {..._props} />
      </Box>
    );
  });
export default withResizable;
