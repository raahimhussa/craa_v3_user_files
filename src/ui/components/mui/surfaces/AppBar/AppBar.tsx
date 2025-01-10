import { AppBarProps as MuiAppBarProps, PaperProps } from '@mui/material';
import compose from '@shopify/react-compose';
import { MouseEventHandler } from 'react';
import AppBarView from './AppBarView';
import withMeta from './withMeta';

export type AppBarItem = {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  renderItem: (item: AppBarItem) => React.ReactNode;
};

export type AppBarItems = {
  left: AppBarItem[];
  right: AppBarItem[];
  center: AppBarItem[];
};

export type AppBarProps = MuiAppBarProps & {
  items: AppBarItems;
} & PaperProps;

export default compose<AppBarProps>(withMeta)(AppBarView);
