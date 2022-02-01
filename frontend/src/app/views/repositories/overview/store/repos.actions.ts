import {Action} from '@ngrx/store'
import {AllRepositoryInfo} from "../../../../models/RepositoryInfo";

export const GETREPOS = 'GETREPOS'

export class AddRepos implements Action {
  readonly type = GETREPOS

  constructor(public payload: AllRepositoryInfo) {
  }
}

export type ReposActions = AddRepos
