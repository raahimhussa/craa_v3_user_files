import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { WrappingFunction } from '@shopify/react-compose';
import { observer, useLocalObservable } from 'mobx-react';
import React, { useEffect, useRef } from 'react';

const withContextMenu: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { state } = props;
    const ref = useRef<HTMLDivElement>(null);

    const v1Documents = state.trainingRoom.simulation.viewports[0].documents;
    const v2Documents = state.trainingRoom.simulation.viewports[1].documents;
    const v1Docs = v1Documents.map((doc: any) => ({
      text: doc.name,
      value: doc,
      depth: 2,
      isHover: false,
      onClick: () => {
        state.trainingRoom.simulation.viewports[0].pdfViewer.document = doc;
      },
    }));

    const v2Docs = v2Documents.map((doc: any) => ({
      text: doc.name,
      value: doc,
      depth: 2,
      isHover: false,
      onClick: () => {
        state.trainingRoom.simulation.viewports[1].pdfViewer.document = doc;
      },
    }));
    // 해당 메뉴를 프롭으로 받도록 설계하는 것이 중요합니다. 일단은 로컬에 선언합니다.
    const localState = useLocalObservable(() => ({
      menu: {
        open: false,
        x: 0,
        y: 0,
        items: [
          {
            text: 'Select Document',
            depth: 1,
            open: false,
            isHover: false,
            items: [
              {
                text: 'Viewport1',
                depth: 2,
                isHover: false,
                // items: v1Docs,
              },
              {
                text: 'Viewport2',
                depth: 2,
                isHover: false,
                // items: v2Docs,
              },
            ],
          },
          {
            text: 'Add Note',
            depth: 1,
            isHover: false,
          },
        ],
      },
    }));

    useEffect(() => {
      ref.current?.addEventListener(
        'contextmenu',
        function (e) {
          e.preventDefault();
          localState.menu.open = !localState.menu.open;
          localState.menu.x = e.pageX;
          localState.menu.y = e.pageY;
          return false;
        },
        false
      );
    }, []);

    const onMouseOverMenu = (item: any) => {
      item.isHover = true;
      item.open = true;
    };

    const onMouseLeaveMenu = (item: any) => {
      item.isHover = false;
      item.open = false;
    };
    const onClick = (e: any) => {
      e.preventDefault();
      localState.menu.open = false;
    };

    const renderMenuBox = (item: any, index: number) => {
      let bgcolor = item.isHover ? '#336699' : '#333333';
      let sx: SxProps = {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        pt: 1,
        pb: 1,
        pl: 2 * item.depth,
        height: 48,
        width: 320,
        color: 'white',
        fontWeight: 700,
        fontSize: 16,
        bgcolor,
      };
      if (item.depth > 1) {
        sx.position = 'absolute';
        sx.left = 320;
        sx.top = index * 48;
      }
      // const onClick = (item: any) => {
      //   item?.onClick()
      // }
      return (
        <Box
          sx={sx}
          onClick={item.onClick}
          onMouseOver={() => onMouseOverMenu(item)}
          onMouseLeave={() => onMouseLeaveMenu(item)}
        >
          {item.text}
          {item.open && item.items?.map(renderMenuBox)}
        </Box>
      );
    };

    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
        onClick={onClick}
      >
        {localState.menu.open && (
          <Box
            sx={{
              position: 'absolute',
              left: localState.menu.x,
              top: localState.menu.y,
              bgcolor: '#333333',
            }}
          >
            {localState.menu.items.map(renderMenuBox)}
          </Box>
        )}
        <WrappedComponent {...props} />
      </div>
    );
  });

export default withContextMenu;
