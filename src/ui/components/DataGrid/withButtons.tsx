import { Button } from '@components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ButtonProps } from '@mui/material/Button';
import { observer } from 'mobx-react';
import uniqid from 'uniqid';
import { green, red } from '@mui/material/colors';
const withButtons = (WrappedComponent: any) =>
  observer((props: any) => {
    const { leftButtons = [], rightButtons = [], buttons = true } = props;

    const renderButton = (button: ButtonProps & any, color?: string) => {
      if (button.type === 'custom') {
        return button.renderButton();
      }

      return (
        <Button
          sx={{
            borderRadius: 16,
            m: 0.2,
            mt: 2,
            bgcolor: color,
            width: 200,
          }}
          key={uniqid()}
          color={button.color}
          onClick={button.onClick}
          variant="contained"
        >
          {button.title}
        </Button>
      );
    };

    return (
      <Box>
        {buttons ? (
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Grid item>
              {leftButtons?.map((button: any) =>
                renderButton(button, green[500])
              )}
            </Grid>
            <Grid item>
              {rightButtons?.map((buuton: any) =>
                renderButton(buuton, red[700])
              )}
            </Grid>
          </Grid>
        ) : null}
        <WrappedComponent {...props} />
      </Box>
    );
  });

export default withButtons;
