import * as React from 'react';
import { observer } from 'mobx-react';
import { useAsyncDebounce } from 'react-table';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Search } from '@mui/icons-material';
import { useRootStore } from 'src/stores';

function SearchInputView({
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
}: any) {
  const { noteStore } = useRootStore();
  const count = preGlobalFilteredRows?.length;
  // const [value, setValue] = React.useState(globalFilter);
  const onChange = (value: any) => {
    setGlobalFilter(value || undefined);
    noteStore.searchText = value;
  };
  // const onChange = useAsyncDebounce((value) => {
  //   setGlobalFilter(value || undefined);
  //   noteStore.searchText = value;
  // }, 200);

  return (
    <Paper
      component="span"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        m: 1,
        bgcolor: '#e6e6e6',
        mb: 0,
        ml: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '65%',
      }}
      className="search-box"
    >
      <Search sx={{ color: '#b3b3b3', ml: 1, fontSize: '18px' }} />
      <InputBase
        onChange={(e) => {
          onChange(e.target.value);
          // setValue(e.target.value);
        }}
        sx={{ ml: 1, flex: 1, px: 0, py: 0.5 }}
        placeholder={`${count} notes...`}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      {/* <IconButton sx={{ p: '10px' }}>
        <Search />
      </IconButton> */}
    </Paper>
  );
  // return (

  // );
}

export default observer(SearchInputView);
