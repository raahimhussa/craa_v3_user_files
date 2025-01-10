import IFinding, {
  FindingSeverity,
} from 'src/models/finding/finding.interface';
import axios, { AxiosResponse } from 'axios';
import { makeObservable, observable, toJS } from 'mobx';

import FindingRepository from 'src/repos/v2/findingRepository';
import { FindingStatus } from 'src/utils/status';
import { ISimDoc } from 'src/models/simDoc/types';
import { RootStore } from '../root';
import Store from '../store';
import Swal from 'sweetalert2';
import _ from 'lodash';
import identifiableInterface from 'src/commons/interfaces/identifiable.interface';

export default class FindingStore extends Store<IFinding> {
  form: IFinding = {
    _id: undefined,
    visibleId: '',
    text: '',
    severity: FindingSeverity.Major,
    cfr: '',
    domainId: '',
    ich_gcp: '',
    simDocId: null,
    simDocIds: [],
    status: FindingStatus.Active,
  };
  defaultForm: IFinding & identifiableInterface = _.cloneDeep(this.form);
  selectedSimDoc: ISimDoc | null = null;

  constructor(rootStore: RootStore, repository: FindingRepository) {
    super(rootStore, repository);
    makeObservable(this, {
      form: observable,
      selectedSimDoc: observable,
    });
  }

  // *create() {
  //   return this.repository
  //     .create(toJS(this.form))
  //     .catch((error) => {
  //       throw error
  //     })
  //     .finally(() => {
  //       this.resetForm()
  //     })
  // }

  // *update() {
  //   return this.repository
  //     .update({
  //       filter: { _id: this.form._id },
  //       update: this.form,
  //     })
  //     .catch((error) => {
  //       throw error
  //     })
  //     .finally(() => {
  //       this.resetForm()
  //     })
  // }

  // *delete() {
  //   if (this.form._id === '') return
  //   try {
  //     yield this.repository.update({
  //       filter: { _id: this.form._id },
  //       update: { isDeleted: true },
  //     })
  //     this.resetForm()
  //   } catch (error) {
  //     Swal.fire({
  //       title: 'Error',
  //       icon: 'error',
  //     })
  //     throw error
  //   }
  //   Swal.fire({
  //     title: 'Success',
  //     icon: 'success',
  //   })
  // }

  // resetForm() {
  //   this.form = _.cloneDeep(this.defaultForm)
  // }
}
