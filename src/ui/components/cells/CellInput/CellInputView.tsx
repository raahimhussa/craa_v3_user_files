import { Delete, Save } from '@mui/icons-material';
import { ButtonGroup, IconButton, TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import { toJS } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { useRootStore } from 'src/stores';
import Swal from 'sweetalert2';
import { useSWRConfig } from 'swr';
function CellInputView(props: any) {
  const { value: initialValue, row, column } = props;
  const { dialogStore, noteStore } = useRootStore();

  const { enqueueSnackbar } = useSnackbar()

  const localState = useLocalObservable(() => ({
    value: initialValue,
  }));

  const { cache, mutate } = useSWRConfig();
  const matchMutate = (key: string) => {
    const regex = new RegExp(key);
    if (!(cache instanceof Map)) {
      throw new Error(
        'matchMutate requires the cache provider to be a Map instance'
      );
    }

    const keys = [];
    // @ts-ignore
    for (const key of cache.keys()) {
      if (regex.test(key)) {
        keys.push(key);
      }
    }
    const mutations = keys.map((key) => mutate(key));

    return Promise.all(mutations);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (value === '') {
      if (typeof initialValue === 'number') {
        localState.value = 0;
      } else {
        localState.value = '';
      }
    } else {
      if (typeof initialValue === 'number') {
        localState.value = parseFloat(value);
      } else {
        localState.value = value;
      }
    }
  };

  const onKeyPressEnter = async () => {
    if (!column.collectionName) {
      throw new Error(
        'you forgot to enter your collectionName into cell property '
      );
    }
    const accessor = column.id;
    const collectionName = column.collectionName;
    const itemId = row.original._id;
    const newValue = toJS(localState.value);
    console.info(
      `collectionName: ${collectionName}, accessor: ${accessor}, newValue: ${newValue}, itemId: ${itemId}`
    );

    const body = {
      filter: {
        _id: itemId,
      },
      update: {
        [accessor]: newValue,
      },
    };

    noteStore.notes?.map(note => {
      if (note._id === itemId) {
        note.text = newValue
      }
    })

    try {
      await noteStore.noteRepository.update(body);
      Swal.fire({
        title: 'Saved',
        icon: 'success'
      })
      // matchMutate('v2/notes')
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: '500',
        text: 'internal server error!',
        icon: 'error'
      })
    }
  };

  const onClickDelete = async () => {
    const collectionName = column.collectionName;
    const itemId = row.original._id;
    try {
      await noteStore.noteRepository.update({
        filter: {
          _id: itemId,
        },
        update: {
          isDeleted: true,
        },
      });
      // @ts-ignore
      noteStore.notes = noteStore.notes.filter(note => note._id != itemId)

      enqueueSnackbar('Deleted', { variant: 'success' })
      // matchMutate(collectionName);
      // dialogStore.success();
    } catch (error) {
      return enqueueSnackbar('Error!', { variant: 'error' })
      // dialogStore.failure();
    }
  };

  return (
    <TextField
      multiline
      InputProps={{
        endAdornment: (
          <ButtonGroup>
            <IconButton onClick={onKeyPressEnter}>
              <Save color={'secondary'} />
            </IconButton>
            <IconButton onClick={onClickDelete}>
              <Delete htmlColor={red[500]} />
            </IconButton>
          </ButtonGroup>
        ),
      }}
      maxRows={12}
      sx={{ width: '100%' }}
      value={localState.value}
      onChange={onChange}
    />
  );
}
export default observer(CellInputView);
