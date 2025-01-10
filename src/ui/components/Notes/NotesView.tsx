import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useMeasure } from 'react-use';
import { useRootStore } from 'src/stores';
import Mini from './Mini/Mini';
import { Mode } from 'src/stores/noteStore/types';
import Normal from './Normal/Normal';
import Draggable from 'react-draggable';
import axios from 'axios';

function NotesView(props: any) {
  // console.log('notes render')
  const { notesMutate } = props;

  const [ref, { width, height }] = useMeasure();
  const {
    modalStore,
    noteStore,
    uiState: { note: _note },
    userSimulationStore,
  } = useRootStore();
  useEffect(() => {
    const params = {
      filter: {
        userId: userSimulationStore.userSimulation?.userId,
        'viewport.userSimulationId': userSimulationStore.userSimulation?._id,
        isDeleted: false,
      },
      options: {
        sort: {
          updatedAt: -1,
        },
      },
    };
    axios.get('/v2/notes', { params }).then((res) => {
      // noteStore.notes = res.data;
      noteStore.loadData(res.data);
    });
  }, []);
  let note = null;
  useEffect(() => {
    _note.mutate = notesMutate;
  }, [_note, notesMutate]);

  useEffect(() => {
    const isChangeMode = width > 800;
    if (isChangeMode) {
      noteStore.mode = Mode.Normal;
    } else {
      noteStore.mode = Mode.Mini;
    }
  }, [noteStore, width]);

  note =
    modalStore.note.isVisible && noteStore.mode === Mode.Normal ? (
      <Normal height={height} />
    ) : (
      <Mini height={height} />
    );

  return (
    <Box sx={{ height: 600 }} ref={ref}>
      {/* {note} */}
      <Mini
        height={height}
        isNormal={modalStore.note.isVisible && noteStore.mode === Mode.Normal}
      />
    </Box>
  );
}

export default observer(NotesView);
