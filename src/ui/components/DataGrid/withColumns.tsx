import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { AdminColumn, CellType } from './DataGrid';
import _ from 'lodash';
import CellExpander from '../cells/CellExpander/CellExpander';
import CellHeaderExpander from '../cells/CellHeaderExpander/CellHeaderExpander';
import CellSubCompExpander from '../cells/CellSubCompExpander/CellSubCompExpander';
import CellTimestamp from '../cells/CellTimestamp/CellTimestamp';
import CellInput from '../cells/CellInput/CellInput';

const withColumns: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { columns }: { columns: Array<AdminColumn> } = props;
    const _columns = _.cloneDeep(columns);
    let renderRowSubComponent = null;

    _columns?.forEach((column: AdminColumn, index) => {
      switch (column.cellType) {
        case CellType.Editable:
          column.Cell = CellInput;
          break;
        case CellType.Expander:
          column.id = 'expander' + index;
          column.Cell = column.Cell || CellExpander;
          column.Header = column.Header || CellHeaderExpander;
          break;
        case CellType.SubComponent:
          column.id = 'subComponent' + index;
          column.Cell = column.Cell || CellSubCompExpander;
          renderRowSubComponent = column.renderRowSubComponent;
          break;
        case CellType.Date:
          column.Cell = column.Cell || CellTimestamp;
          break;
      }
    });

    return (
      <WrappedComponent
        {...props}
        columns={_columns}
        renderRowSubComponent={renderRowSubComponent}
      />
    );
  });

export default withColumns;
