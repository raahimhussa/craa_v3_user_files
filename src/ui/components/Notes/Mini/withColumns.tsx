import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import { AdminColumn, CellType } from '../../DataGrid/DataGrid';
const withColumns = (WrappedComponent: any) =>
  observer(({ ...rest }) => {
    const columns: Array<AdminColumn> = [
      // {
      //   Header: 'ID',
      //   accessor: 'id',
      //   minWidth: 100,
      // },
      {
        Header: 'VP',
        accessor: 'viewport.index',
        minWidth: 100,
        Cell: (cell: any) => <Box>{cell.row.original.viewport.index + 1}</Box>,
      },
      {
        Header: 'Document',
        accessor: 'viewport.simDoc.title',
        minWidth: 200,
        maxWidth: 700,
      },
      {
        Header: 'Monitoring Note',
        accessor: 'text',
        collectionName: 'notes',
        cellType: CellType.Editable,
        minWidth: 500,
      },
      {
        Header: 'Page',
        accessor: 'viewport.simDoc.currentPage',
        minWidth: 200,
      },
    ];

    const meta = {
      columns,
    };

    return <WrappedComponent {...rest} {...meta} />;
  });

export default withColumns;
