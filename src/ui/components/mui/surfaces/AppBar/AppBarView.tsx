import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { observer } from 'mobx-react';
import { Grid } from '@components';
import { AppBarItem, AppBarProps } from './AppBar';
import uniqid from 'uniqid';

function AppBarView({ items, children, ...rest }: AppBarProps) {
  const renderItem = (item: AppBarItem) => {
    return <div key={uniqid()}>{item.renderItem(item)}</div>;
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundImage: (theme) => theme.craa?.palette.mainGradiant,
          height: '58px',
          justifyContent: 'center',
        }}
        {...rest}
      >
        <Toolbar>
          <Grid container sx={{ border: 0, justifyContent: 'space-evenly' }}>
            <Grid
              item
              columnSpacing={2}
              sx={{ border: 0, flex: 1, display: 'flex' }}
            >
              {items['left']?.map(renderItem)}
            </Grid>
            <Grid
              item
              sx={{
                border: 0,
                flex: 1,
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              {items['center']?.map(renderItem)}
            </Grid>
            <Grid
              item
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {items['right']?.map(renderItem)}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}
export default observer(AppBarView);
