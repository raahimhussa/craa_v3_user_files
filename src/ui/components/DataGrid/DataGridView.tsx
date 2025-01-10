import {
  Box,
  Checkbox,
  ListSubheader,
  MenuItem,
  NativeSelect,
  Select,
  TableSortLabel,
} from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import {
  TableInstance,
  TableOptions,
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
  useFlexLayout,
  useResizeColumns,
  useBlockLayout,
  Cell,
  useExpanded,
  useGroupBy,
} from 'react-table';
import { useRootStore } from 'src/stores';
import { Mode } from 'src/stores/noteStore/types';
import uniqid from 'uniqid';
import SearchInput from '../SearchInput/SearchInput';
import Spacer from '../Spacer/Spacer';

function DataGridView(props: any) {
  const {
    state,
    columns,
    data = [],
    tableStyle,
    headerStyle,
    rowStyle,
    resizerStyle,
    bodyStyle,
    cellStyle,
    renderRowSubComponent = ({ row }: any) => (
      <div>renderRowSubComponent is needed</div>
    ),
  } = props;
  const { noteStore, simDocStore } = useRootStore();
  const [simDocs, setSimdocs] = useState<any[]>([]);
  useEffect(() => {
    let arr: any = [];
    noteStore.simDocs.map((folder) => {
      folder.children.map((doc: any) => {
        if (!doc.isFolder) {
          arr.push(doc);
        } else {
          doc.children.map((doc2: any) => {
            if (!doc2.isFolder) {
              arr.push(doc2);
            }
          });
        }
      });
    });
    setSimdocs(arr);
  }, []);

  const options: TableOptions<object> & any = {
    columns: columns,
    data: noteStore.notes,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { expanded, pageIndex, pageSize, selectedRowIds, globalFilter },
  }: TableInstance<any> = useTable(
    options,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useFlexLayout,
    useBlockLayout,
    useResizeColumns
  );

  useEffect(() => {
    state.selectedRowIds = selectedFlatRows
      .map((selectedFlatRow) => selectedFlatRow.original)
      .map((original) => {
        return original._id;
      });
  }, [selectedFlatRows, state]);

  console.log(noteStore.simDocs);

  return (
    <>
      <Spacer spacing={1} />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <SearchInput
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
        <Select
          className="noteSelect"
          style={{
            width: '35%',
            marginTop: '8px',
            marginRight: 0.5,
          }}
          value={noteStore.selectedSimDoc}
          onChange={(e: any) => {
            console.log(e.target.value);
            noteStore.selectedSimDoc = e.target.value;
            if (e.target.value === 'all') {
              noteStore.notes = noteStore.originalNotes;
            } else {
              noteStore.notes =
                noteStore.originalNotes?.filter((note) => {
                  return note.viewport?.simDoc?._id == e.target.value;
                }) || [];
            }
          }}
        >
          <MenuItem aria-label="None" value="all">
            All
          </MenuItem>
          {noteStore.simDocs
            .map((folder: any) => {
              const menuItems = [];
              menuItems.push(<ListSubheader>{folder.text}</ListSubheader>);

              folder.children.forEach((doc: any) => {
                if (!doc.isFolder) {
                  menuItems.push(
                    <MenuItem className="simdoc" value={doc._id}>
                      {doc.title}
                    </MenuItem>
                  );
                } else {
                  const subMenuItems = [];
                  subMenuItems.push(<ListSubheader>{doc.text}</ListSubheader>);

                  doc.children.forEach((doc2: any) => {
                    if (!doc2.isFolder) {
                      subMenuItems.push(
                        <MenuItem className="subsimdoc" value={doc2._id}>
                          {doc2.title}
                        </MenuItem>
                      );
                    }
                  });

                  menuItems.push(subMenuItems);
                }
              });

              return menuItems;
            })
            .reverse()}
          {/* {noteStore.simDocs
            .map((folder: any) => {
              return [
                <ListSubheader>{folder.text}</ListSubheader>,
                <>
                  {folder.children.map((doc: any) => {
                    if (!doc.isFolder) {
                      return (
                        <MenuItem className="simdoc" value={doc._id}>
                          {doc.title}
                        </MenuItem>
                      );
                    } else {
                      return [
                        <ListSubheader>{doc.text}</ListSubheader>,
                        <>
                          {doc.children.map((doc2: any) => {
                            if (!doc2.isFolder) {
                              return (
                                <MenuItem
                                  className="subsimdoc"
                                  value={doc2._id}
                                >
                                  {doc2.title}
                                </MenuItem>
                              );
                            }
                          })}
                        </>,
                      ];
                    }
                  })}
                </>,
              ];
            })
            .reverse()} */}
        </Select>
        {/* <select
          className="noteSelect select"
          style={{
            width: '35%',
            marginTop: '8px',
            marginRight: 0.5,
          }}
          value={noteStore.selectedSimDoc}
          onChange={(e: any) => {
            noteStore.selectedSimDoc = e.target.value;
            if (e.target.value === 'all') {
              noteStore.notes = noteStore.originalNotes;
            } else {
              noteStore.notes =
                noteStore.originalNotes?.filter((note) => {
                  return note.viewport?.simDoc?._id == e.target.value;
                }) || [];
            }
          }}
        >
          <option aria-label="None" value="all">
            All
          </option>
          {noteStore.simDocs
            .map((folder: any) => {
              return (
                <optgroup label={folder.text}>
                  {folder.children.map((doc: any) => {
                    if (!doc.isFolder) {
                      return <option value={doc._id}>{doc.title}</option>;
                    } else {
                      return (
                        <optgroup label={doc.title}>
                          {doc.children.map((doc2: any) => {
                            if (!doc2.isFolder) {
                              return (
                                <option value={doc2._id}>{doc2.title}</option>
                              );
                            }
                          })}
                        </optgroup>
                      );
                    }
                  })}
                </optgroup>
              );
            })
            .reverse()}
        </select> */}
      </Box>
      <Spacer spacing={1} />
      <div
        {...getTableProps({
          style: tableStyle,
        })}
        className="table"
      >
        <>
          {headerGroups.map((headerGroup: any) => (
            // eslint-disable-next-line react/jsx-key
            <div
              {...headerGroup.getHeaderGroupProps({
                style: rowStyle,
              })}
              className="tr"
            >
              {headerGroup.headers.map((column: any) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    {...column.getHeaderProps({
                      style: headerStyle,
                    })}
                    className="th"
                  >
                    {column.render('Header')}
                    <div
                      {...column.getResizerProps({
                        style: resizerStyle,
                      })}
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </>
        <div
          {...getTableBodyProps({
            style: bodyStyle,
          })}
        >
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <React.Fragment key={uniqid()}>
                <div
                  {...row.getRowProps({
                    style: rowStyle,
                  })}
                  className="tr"
                >
                  {row.cells.map((cell: Cell) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        {...cell.getCellProps({
                          style: cellStyle,
                        })}
                        className="td"
                      >
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
                {row.isExpanded && renderRowSubComponent ? (
                  <div className="tr">
                    <div className="td" style={cellStyle}>
                      {renderRowSubComponent({ row })}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default observer(DataGridView);

// eslint-disable-next-line react/display-name
export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, style, ...rest }: any, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef: any = ref || defaultRef;

    const _style: React.CSSProperties = {
      ...style,
    };

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <Checkbox
        ref={resolvedRef}
        {...rest}
        style={_style}
        size="small"
        color="success"
      />
    );
  }
);
