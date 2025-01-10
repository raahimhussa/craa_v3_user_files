import { Box, Button, Divider, Slider, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { observer, useLocalObservable } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';

import Draggable from 'react-draggable';
import { IViewport } from 'src/models/viewport/viewport.interface';
import { KeyedMutator } from 'swr';
import NoteButton from '../NoteButton/NoteButton';
import Notes from '../Notes/Notes';
import PDFController from '../PDFController/PDFController';
import { Spacer } from '@components';
import Toolbar from '../Viewport/Toolbar/Toolbar';
import Viewport from 'src/models/viewport';
import ViewportRepository from 'src/repos/v2/viewport';
import _ from 'lodash';
import _Viewport from '../Viewport/Viewport';
import styled from '@emotion/styled';
import { toJS } from 'mobx';
import uniqid from 'uniqid';
import { useRootStore } from 'src/stores';
import axios from 'axios';
import { SimulationMode } from 'src/stores/ui';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaximizeIcon from '@mui/icons-material/Maximize';

function ViewportsView() {
  const {
    authStore,
    simulationStore,
    userSimulationStore,
    viewportStore,
    uiState,
    uiState: { toolbar },
  } = useRootStore();
  const [viewportArr, setViewportArr] = useState<Array<Viewport>>([]);

  useEffect(() => {
    viewportStore.save(SimulationMode.Followup);
    if (viewportStore.viewports.length == 0) {
      const viewport: any = {
        active: false,
        index: 0,
        userId: authStore.user._id,
        simulationId: simulationStore.simulation?._id,
        userSimulationId: userSimulationStore.userSimulation?._id!,
        simDoc: null,
        viewedSimDocIds: [],
        isMounted: true,
        isDeleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const viewport2: any = {
        active: false,
        index: 1,
        userId: authStore.user._id,
        simulationId: simulationStore.simulation?._id,
        userSimulationId: userSimulationStore.userSimulation?._id!,
        simDoc: null,
        viewedSimDocIds: [],
        isMounted: true,
        isDeleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const viewport3: any = {
        active: false,
        index: 2,
        userId: authStore.user._id,
        simulationId: simulationStore.simulation?._id,
        userSimulationId: userSimulationStore.userSimulation?._id!,
        simDoc: null,
        viewedSimDocIds: [],
        isMounted: true,
        isDeleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        testString: 'yulim',
      };
      viewportStore.createViewport(viewport);
      viewportStore.createViewport(viewport2);
      viewportStore.createViewport(viewport3);
    }
  }, []);

  useEffect(() => {
    //@ts-ignore
    setViewportArr(viewportStore.viewports);
  }, [viewportStore.viewports]);

  const elRef = useRef<HTMLInputElement>(null);
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (elRef.current) {
      // @ts-ignore
      elRef.current.style.opacity = 1;
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: uiState.windowDimensions.width - 130,
      }}
    >
      {[0, 1, 2].map((val: any, index: any) => {
        if (index === 2) {
          return (
            <Draggable
              handle=".handle"
              bounds="parent"
              defaultPosition={{ x: 100, y: 100 }}
              onStart={() => {
                viewportArr[2].isDocOpen = false;
              }}
            >
              <Box
                className="viewport2"
                sx={{
                  position: 'absolute',
                  zIndex: 1004,
                  display: 'none',
                }}
              >
                <Box
                  sx={{
                    height: '30px',
                    bgcolor: '#3d4042',
                    minWidth: '450px',
                  }}
                  className="handle"
                >
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      display: 'flex',
                      justifyContent: 'center',
                      flex: 1,
                      alignItems: 'center',
                      pt: '0.3rem',
                      position: 'relative',
                    }}
                  >
                    {'Viewport 3'}
                  </Typography>
                  <Button
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'rgb(255, 255, 255,0.2)',
                      p: 0,
                      minWidth: '10px',
                      mt: '0.2rem',
                      mr: '0.3rem',
                      '&:hover': {
                        bgcolor: 'rgb(255, 255, 255,0.4)',
                      },
                    }}
                    onClick={async () => {
                      // setIsMinimize(!isMinimize);
                      if (elRef.current != undefined) {
                        elRef.current.style.display =
                          elRef.current.style.display == 'none'
                            ? 'block'
                            : 'none';
                        if (
                          minRef?.current != undefined &&
                          maxRef?.current != undefined
                        ) {
                          if (elRef.current.style.display == 'none') {
                            await viewportStore.viewportRepository.update({
                              filter: { _id: viewportArr[2]._id },
                              update: { active: false },
                            });
                            viewportStore.viewports[2].active = false;
                            minRef.current.style.display = 'none';
                            maxRef.current.style.display = 'block';
                          } else {
                            minRef.current.style.display = 'block';
                            maxRef.current.style.display = 'none';
                          }
                        }
                      }
                    }}
                  >
                    <Box ref={maxRef} sx={{ display: 'none', height: '24px' }}>
                      <MaximizeIcon sx={{ color: 'white' }} />
                    </Box>
                    <Box ref={minRef} sx={{ height: '24px' }}>
                      <MinimizeIcon sx={{ color: 'white' }} />
                    </Box>
                  </Button>
                </Box>
                <Divider sx={{ bgcolor: grey[100] }} />
                <Box ref={elRef}>
                  <Toolbar viewport={viewportArr[2]} />
                  <Divider sx={{ bgcolor: 'white' }} />
                  <Box
                    sx={{
                      opacity: 1,
                      border: '1px solid #3d4042',
                      borderTop: 'none',
                      height: 500,
                      overflow: 'scroll',
                      resize: 'both',
                      minWidth: 848,
                      bgcolor: '#525659',
                    }}
                  >
                    <_Viewport viewport={viewportArr[2]} />
                  </Box>
                </Box>
              </Box>
            </Draggable>
          );
        } else {
          return (
            <Box
              key={uniqid()}
              // className={'viewport' + viewportArr[index]}
              className={'viewport' + index}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                height: uiState.windowDimensions.height - 50,
              }}
            >
              <Toolbar viewport={viewportArr[index]} />
              <Divider sx={{ bgcolor: 'white' }} />
              <_Viewport viewport={viewportArr[index]} />
            </Box>
          );
        }
      })}
      <NoteButton />
      <Notes />
    </Box>
  );
}
export default observer(ViewportsView);

const PrettoSlider = styled(Slider)({
  color: 'white',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
