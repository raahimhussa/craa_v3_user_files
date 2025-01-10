import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { uniqueId } from 'lodash';
import { observer, useLocalObservable } from 'mobx-react';
import { SyntheticEvent, useRef } from 'react';
import { useRootStore } from 'src/stores';
import { MenuProps } from './Menu';
function MenuView({ items, ...rest }: MenuProps) {
  const localState = useLocalObservable(() => ({
    open: false,
  }));
  const { viewportStore } = useRootStore();

  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    viewportStore.isTreeOpen = !viewportStore.isTreeOpen;
    localState.open = !localState.open;
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    localState.open = false;
  };

  const renderItem = (item: any) => {
    const onClick = (event: Event | SyntheticEvent) => {
      handleClose(event);
      if (item.onClick) {
        item.onClick();
      }
    };

    return (
      <MenuItem key={uniqueId()} onClick={onClick}>
        {item.text}
      </MenuItem>
    );
  };
  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        // aria-controls={localState.open ? 'composition-menu' : undefined}
        // aria-expanded={localState.open ? 'true' : undefined}
        // aria-haspopup="true"
        variant="outlined"
        onClick={handleToggle}
      >
        Select Document
      </Button>
      <Popper
        open={localState.open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        // transition
        // disablePortal
      >
        {({ TransitionProps, placement }) => {
          return (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                {/* <ClickAwayListener onClickAway={handleClose}> */}
                <MenuList
                  // autoFocusItem={localState.open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  {items?.map(renderItem)}
                </MenuList>
                {/* </ClickAwayListener> */}
              </Paper>
            </Grow>
          );
        }}
      </Popper>
    </div>
  );
}

export default observer(MenuView);
