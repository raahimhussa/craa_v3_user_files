import { LogScreen, SimEvent } from 'src/models/log/types';
import { makeAutoObservable, toJS } from 'mobx';

import { INote } from 'src/models/note/types';
import { IStore } from '../types';
import { Mode } from './types';
import Note from 'src/models/note';
import NoteRepository from 'src/repos/v2/note';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import Swal from 'sweetalert2';
import _ from 'lodash';
import { useSnackbar } from 'notistack';

export default class NoteStore implements IStore {
  rootStore: RootStore;
  router: RouterStore;
  noteRepository: NoteRepository;
  notes: Note[] | null = null;
  originalNotes: Note[] | null = null;
  searchText: string = '';
  mode: Mode = Mode.Mini;
  form: INote = {
    _id: null,
    viewport: null,
    userSimulationId: '',
    text: '',
    userId: '',
    recordId: '',
    type: '',
    complianceNote: {
      taken: '',
      shouldTaken: '',
      percent: '',
    },
  };
  disabled: boolean = true;
  noteOffset: number = 600;
  noteWidth: number = 400;
  simDocs: any[] = [];
  selectedSimDoc: string = 'all';
  mutate: any;
  isMinimized: boolean = false;

  constructor(rootStore: RootStore, noteRepository: NoteRepository) {
    this.rootStore = rootStore;
    this.router = rootStore.routerStore;
    this.noteRepository = noteRepository;
    makeAutoObservable(this, {
      rootStore: false,
    });
  }

  loadData(data: Note[]) {
    this.notes = data.map((data) => {
      const note = new Note(this);
      note.load(data);
      return note;
    });
    this.originalNotes = this.notes;
  }

  get notesFilteredBySearchText() {
    const regExp = new RegExp(this.searchText, 'i');

    return this.notes?.filter((note: Note) => regExp.test(note.text));
  }

  updateNotes(note: Note) {
    const index = this.notes?.findIndex((_note) => _note._id === note._id);
    let temp: Note[] | null = this.notes;
    if (index !== undefined && temp !== null) {
      temp.splice(index, 1);
      temp.unshift(note);
      // temp[index] = note;
      this.notes = temp;
    }
  }

  *addNote() {
    const userSimulation = toJS(
      this.rootStore.userSimulationStore.userSimulation
    );
    const note = {
      ...toJS(this.form),
      reopenCount: userSimulation?.reopenCount ? userSimulation.reopenCount : 0,
    };
    if (
      note.text === '' &&
      note.complianceNote.taken === 0 &&
      note.complianceNote.shouldTaken === 0 &&
      note.complianceNote.percent === 0
    ) {
      return Swal.fire({
        title: 'please write your answer',
        icon: 'info',
      });
    }
    if (note.text !== '') {
      note.type = 'monitoring';
    } else {
      note.type = 'compliance';
    }
    note.userId = this.rootStore.authStore.user._id;

    const viewport = this.rootStore.viewportStore.viewports.find(
      (viewport) => viewport.active
    );

    note.viewport = viewport?.getJSON()!;
    note.recordId = this.rootStore.screenRecorderStore.recordId ?? '';

    try {
      // @ts-ignore
      const remoteNote: any = yield this.noteRepository.create(note);

      const _note = new Note(this);

      _note.load(remoteNote);

      this.notes?.unshift(_note);
      this.form.text = '';
      this.form.complianceNote.taken = '';
      this.form.complianceNote.shouldTaken = '';
      this.form.complianceNote.percent = '';

      yield this.rootStore.logStore.create(
        SimEvent.OnClickAddNote,
        LogScreen.Baseline,
        remoteNote
      );
      return remoteNote;
    } catch (error) {
      return console.error(error);
    }
  }
}
