import { LogScreen, SimEvent } from '../log/types';

import { IModel } from '../types';
import { INote } from './types';
import NoteStore from 'src/stores/noteStore';
import Swal from 'sweetalert2';
import Viewport from '../viewport';
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

export default class Note implements IModel, INote {
  _id: any = null;
  viewport: Viewport | null = null;
  reopenCount: number = 0;
  // logId: string = '';
  text: string = '';
  edit: string = '';
  type: string = '';
  complianceNote: any = {};
  userId: string = '';
  // duration: number = 0;
  recordId: string = '';
  isDeleted: boolean = false;
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  userSimulationId = '';
  store: NoteStore | null;
  mutate: any;
  constructor(store: NoteStore) {
    this.store = store;
    makeAutoObservable(this, {
      store: false,
      userId: false,
    });
  }

  load(data: any) {
    Object.assign(this, data);
  }

  *save() {
    const _note: Note = _.cloneDeep(this);
    _note.store = null;

    _note.text = this.edit;

    if (_note.type === 'monitoring' && !_note.text) {
      return Swal.fire({
        title: 'empty text',
        icon: 'error',
      });
    }

    try {
      yield this.store?.noteRepository.update({
        filter: { _id: _note._id },
        update: _note,
      });

      yield this.store?.rootStore.logStore.create(
        SimEvent.onClickSave,
        LogScreen.Baseline,
        _note
      );
      this.text = this.edit;
      this.store?.updateNotes(this);
      // this.mutate();
    } catch (error) {
      return Swal.fire({
        title: 'Internal Server Error',
        icon: 'error',
      });
    }
  }

  *delete() {
    const _note: Note = _.cloneDeep(this);
    _note.store = null;
    _note.isDeleted = true;
    try {
      yield this.store?.noteRepository.update({
        filter: {
          _id: this._id,
        },
        update: {
          isDeleted: true,
        },
      });
      yield this.store?.rootStore.logStore.create(
        SimEvent.onClickDelete,
        LogScreen.Baseline,
        _note
      );
    } catch (error) {
      throw error;
    }
    // @ts-ignore
    this.store.notes = this.store?.notes?.filter(
      (note) => note._id != this._id
    );
    //@ts-ignore
    this.store.originalNotes = this.store?.originalNotes?.filter(
      (note) => note._id != this._id
    );
  }

  setText(value: string) {
    this.text = value;
  }
}
