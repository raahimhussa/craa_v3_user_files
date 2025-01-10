import compose from '@shopify/react-compose';
import DataGridView from './DataGridView';
import withColumns from './withColumns';
import withButtons from './withButtons';
import withMeta from './withMeta';
import withStyle from './withStyle';
import { Column } from 'react-table';
import { ButtonProps } from '@mui/material';

export enum Type {
  Number = 'number',
  String = 'string',
  Boolean = 'boolean',
  Date = 'date',
}
export enum CellType {
  Expander = 'expander',
  Editable = 'editable',
  SubComponent = 'subComponent',
  Date = 'date',
}

export type AdminButton = {
  title: string;
  isVisible?: boolean;
  color: string;
} & ButtonProps;

export type AdminColumn = Column & {
  type?: Type;
  cellType?: CellType;
  renderRowSubComponent?: any;
} & any;

export type DataGridProps = {
  buttons: boolean;
  header: boolean;
  state: any;
};

export type HocComponentProps = {};

export type DataGridViewProps = DataGridProps & HocComponentProps;

export default compose<any>(
  withColumns,
  withButtons,
  withMeta,
  withStyle
)(DataGridView);
