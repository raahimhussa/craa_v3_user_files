import * as React from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import { observer, useLocalObservable } from 'mobx-react';
import { StepItem } from './type';
import StepContent from '@mui/material/StepContent';
import { Typography } from '@mui/material';
import customTheme from 'src/ui/theme/customizedTheme';

function _Stepper({
  steps = [],
  onClickStep = (step: StepItem) => null,
}: {
  steps: StepItem[];
  onClickStep?: (step: StepItem) => void;
}) {
  const stepper: {
    steps: StepItem[];
  } = useLocalObservable(() => ({
    steps: steps,
  }));
  const activeStep = steps.filter((step) => step?.isCompleted).length;
  return (
    <Box sx={{ width: 1 }}>
      <Stepper orientation="vertical" activeStep={activeStep}>
        {stepper.steps.map((step) => (
          <Step
            // onClick={() => onClickStep(step)}
            key={step?.label}
            completed={step?.isCompleted}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between !important',
              alignItems: 'center',
              px: 1,
            }}
          >
            <StepLabel>{step?.label}</StepLabel>
            {/* {step?.isCompleted && ( */}
            <Button
              size="small"
              variant="outlined"
              onClick={step?.view}
              sx={{
                borderRadius: '2px',
                boxShadow: 'none',
                py: '0.3rem',
                // bgcolor: 'rgb(0, 115, 187)',
                '&:hover': {
                  // color: 'white !important',
                  boxShadow: 'none',
                },
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '11.5px' }}>
                view
              </Typography>
            </Button>
            {/* )} */}
            {/* {!step?.isCompleted && (
              <StepContent>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={step?.view}
                  sx={{
                    borderRadius: '2px',
                    boxShadow: 'none',
                    py: '0.3rem',
                    '&:hover': {
                      // color: 'white !important',
                      boxShadow: 'none',
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    View
                  </Typography>
                </Button>
              </StepContent>
            )} */}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default observer(_Stepper);
