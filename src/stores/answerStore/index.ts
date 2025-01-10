import { makeObservable, observable } from 'mobx'

import AnswerRepository from 'src/repos/v2/answer'
import { AnswerStatus } from 'src/utils/status'
import { AssessmentScorerType } from '../ui/pages/assessment'
import IAnswer from 'src/models/answer/answer.interface'
import Identifiable from 'src/commons/interfaces/identifiable.interface'
import { RootStore } from '../root'
import Store from '../store'
import _ from 'lodash'

export default class AnswerStore extends Store<IAnswer> {
  form: IAnswer & Identifiable = {
    _id: null,
    assessmentId: '',
    simDocId: '',
    findingId: '',
    scoring: {
      firstScorer: {
        scorerId: '',
        noteId: null,
        answerStatus: AnswerStatus.NotScored,
        updatedAt: new Date(),
      },
      secondScorer: {
        scorerId: '',
        noteId: null,
        answerStatus: AnswerStatus.NotScored,
        updatedAt: new Date(),
      },
      adjudicator: {
        scorerId: '',
        noteId: null,
        answerStatus: AnswerStatus.NotScored,
        updatedAt: new Date(),
      },
    },
  }

  defaultForm: IAnswer & Identifiable = _.cloneDeep(this.form)
  constructor(store: RootStore, repository: AnswerRepository) {
    super(store, repository)
    makeObservable(this, {
      form: observable,
    })
  }

  async markAsCorrect(answerId: string, scorerType: AssessmentScorerType) {
    return this.repository.update({
      filter: {
        _id: answerId,
      },
      update: {
        $set: {
          [`scoring.${scorerType}.answerStatus`]: AnswerStatus.Correct,
          [`scoring.${scorerType}.updatedAt`]: new Date(),
        },
        // status: AnswerStatus.Correct,
      },
    })
  }

  async markAsIncorrect(answerId: string, scorerType: AssessmentScorerType) {
    return this.repository.update({
      filter: {
        _id: answerId,
      },
      update: {
        $set: {
          [`scoring.${scorerType}.answerStatus`]: AnswerStatus.InCorrect,
          [`scoring.${scorerType}.noteId`]: null,
          [`scoring.${scorerType}.updatedAt`]: new Date(),
        },
        // status: AnswerStatus.InCorrect,
      },
    })
  }

  async connectNoteIdToAnswer(
    answerId: string,
    noteId: string | null,
    scorerType: AssessmentScorerType
  ) {
    return this.repository.update({
      filter: {
        _id: answerId,
      },
      update: {
        $set: {
          [`scoring.${scorerType}.noteId`]: noteId,
          [`scoring.${scorerType}.updatedAt`]: new Date(),
        },
        // noteId: noteId,
      },
    })
  }
}
