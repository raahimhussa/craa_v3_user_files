import { observer, useLocalObservable } from 'mobx-react';
import { WrappingFunction } from '@shopify/react-compose';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { ButtonBase, ButtonGroup, Tooltip } from '@mui/material';
import { Close, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRootStore } from 'src/stores';
import ModalStore from 'src/stores/modalStore';
import customTheme from 'src/ui/theme/customizedTheme';
import { Rnd } from 'react-rnd';
//@ts-ignore
import { useMeasure } from 'react-use';
import { useEffect, useRef, useState } from 'react';

type T = Omit<ModalStore, 'store' | 'router'>;
const withDraggable =
  ({
    title = 'no title',
    kind = 'note',
  }: {
    title?: string;
    kind: keyof T;
  }): WrappingFunction =>
  (WrappedComponent) =>
    observer((props) => {
      // console.log('draggable note')

      const localState = useLocalObservable(() => ({
        activeDrags: 0,
        checked: true,
      }));

      const { modalStore, noteStore } = useRootStore();

      const onStart = () => {
        localState.activeDrags = ++localState.activeDrags;
      };

      const onStop = () => {
        localState.activeDrags = --localState.activeDrags;
      };

      const dragHandlers = { onStart: onStart, onStop: onStop };
      const commonBorderRadius = 5;
      // const borderTopLeftRadius = commonBorderRadius;
      // const borderTopRightRadius = commonBorderRadius;

      const onClickMinimize = () => {
        localState.checked = false;
        noteStore.isMinimized = true;
      };

      const onClickMaximize = () => {
        localState.checked = true;
        noteStore.isMinimized = false;
      };

      const onClickClose = () => {
        // @ts-ignore
        modalStore[kind].isVisible = false;
      };

      return (
        // <ResizableBox
        //   width={500}
        //   height={813}
        //   // minConstraints={[100, 100]}
        //   // maxConstraints={[300, 300]}
        //   className="resizable"
        // >
        // <Draggable handle="strong" bounds="parent" {...dragHandlers}>
        <>
          {
            // @ts-ignore
            modalStore[kind].isVisible! ? (
              <Rnd
                default={{
                  x: 500,
                  y: 100,
                  width: 450,
                  // width: 1150,
                  height: 650,
                }}
                className="note-drag"
                dragHandleClassName="note-handle"
              >
                <Box
                  sx={{
                    // position: 'absolute',
                    // zIndex: 1005,
                    // left: '45%',
                    // @ts-ignore
                    display: modalStore[kind].isVisible! ? 'block' : 'none',
                    borderColor: grey[500],
                    // borderTopLeftRadius,
                    // borderTopRightRadius,
                    // minWidth: '300px',
                    // resize: 'both',
                  }}
                >
                  {/* <strong className="cursor"> */}
                  <Box
                    sx={{
                      // height: 40,
                      bgcolor: grey[100],
                      color: customTheme.craa?.palette.dark,
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 2,
                      display: 'flex',
                      border: '1px solid black',
                      borderColor: 'rgb(25, 52, 51,0.3)',
                      borderTopLeftRadius: '13px',
                      borderTopRightRadius: '13px',
                      borderBottom: 'none',
                      pt: 2,
                      pb: 1,
                    }}
                    className="note-handle"
                  >
                    <Box
                      sx={{
                        fontSize: 18,
                        color: customTheme.craa?.palette.header,
                        fontWeight: 700,
                      }}
                    >
                      {title}
                    </Box>
                    <ButtonGroup
                      sx={{
                        position: 'absolute',
                        right: 0,
                        mr: 1.5,
                        top: 0,
                        mt: 1.5,
                      }}
                    >
                      <Tooltip title="Minimize">
                        <ButtonBase onClick={onClickMinimize}>
                          <ExpandLess
                            sx={{ color: customTheme.craa?.palette.header }}
                          />
                        </ButtonBase>
                      </Tooltip>
                      <Tooltip title="Maximize">
                        <ButtonBase onClick={onClickMaximize}>
                          <ExpandMore
                            sx={{ color: customTheme.craa?.palette.header }}
                          />
                        </ButtonBase>
                      </Tooltip>
                      <Tooltip title="Close">
                        <ButtonBase onClick={onClickClose}>
                          <Close
                            sx={{ color: customTheme.craa?.palette.header }}
                          />
                        </ButtonBase>
                      </Tooltip>
                    </ButtonGroup>
                  </Box>
                  <Box
                    sx={{
                      display: !localState.checked ? 'none' : 'block',
                      resize: 'both',
                    }}
                  >
                    <WrappedComponent {...props} />
                  </Box>
                  {/* </strong> */}
                </Box>
              </Rnd>
            ) : (
              <></>
            )
          }
        </>
        //     <DragResizeContainer
        //       onLayoutChange={onLayoutChange}
        //       layout={[
        //         {
        //           key: 'note',
        //           x: currentPosition.x,
        //           y: currentPosition.y,
        //           width: currentPosition.width,
        //           height: currentPosition.height,
        //           // zIndex: 1004,
        //         },
        //       ]}
        //       className="resize-container"
        //       resizeProps={{
        //         minWidth: 410,
        //         minHeight: 650,
        //         enable: {
        //           top: true,
        //           right: true,
        //           bottom: true,
        //           left: true,
        //           topRight: true,
        //           bottomRight: true,
        //           bottomLeft: true,
        //           topLeft: true,
        //         },
        //       }}
        //       ref={myRef}
        //     >
        //  </DragResizeContainer>
      );
    });

export default withDraggable;
