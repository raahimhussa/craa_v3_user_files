import { BaselineStatus, UserStatus } from 'src/utils/status'

import { UserSimulationDoc } from './types'

export default interface IUserBaseline {
  readonly userId: string
  readonly assessmentTypeId: string
  readonly usageTime: number
  readonly testTime: number
  readonly results: Result
  readonly status: BaselineStatus
  readonly attemptCount: number
  readonly instructions: UserSimulationDoc[]
  readonly protocols: UserSimulationDoc[]
  readonly studyLogs: UserSimulationDoc[]
  readonly isDeleted: boolean
  readonly startedAt: number
}

export class Result {
  scoreByDomain!: {
    domainId: string
    name: string
    correctAnswers: string[]
    incorrectAnswers: string[]
    allAnswers: string[]
    pass: boolean
    minScore: number
    score: number
  }[]
  scoreByMainDomain!: {
    domainId: string
    name: string
    correctAnswers: string[]
    incorrectAnswers: string[]
    allAnswers: string[]
    pass: boolean
    minScore: number
    score: number
  }[]
  identifiedScoreBySeverity!: {
    severity: number
    identifiedFindings: string[]
    notIdentifiedFindings: string[]
    allFindings: string[]
  }[]
  identifiedScoreByDomain!: {
    domainId: string
    identifiedFindings: string[]
    notIdentifiedFindings: string[]
    allFindings: string[]
  }[]
  identifiedScoreByMainDomain!: {
    domainId: string
    identifiedFindings: string[]
    notIdentifiedFindings: string[]
    allFindings: string[]
  }[]
  identifiedAnswers!: string[]
  notIdentifiedAnswers!: string[]
}
