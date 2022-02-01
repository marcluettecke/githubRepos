import {Action} from '@ngrx/store'
import {UserInfo} from "../../../../models/UserInfo";

export const GETCONTRIBUTORS = 'GETCONTRIBUTORS'

export class AddContributor implements Action {
  readonly type = GETCONTRIBUTORS

  constructor(public payload: UserInfo) {
  }
}

export type ContributorsActions = AddContributor
