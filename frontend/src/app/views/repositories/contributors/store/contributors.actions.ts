import {Action} from '@ngrx/store'
import {UserInfo} from "../../../../models/UserInfo";

export const GETCONTRIBUTORS = 'GETCONTRIBUTORS'
export const CLEARCONTRIBUTORS = 'CLEARCONTRIBUTORS'


export class AddContributor implements Action {
  readonly type = GETCONTRIBUTORS

  constructor(public payload: UserInfo) {
  }
}

export class ClearContributor implements Action {
  readonly type = CLEARCONTRIBUTORS

  constructor() {
  }
}


export type ContributorsActions = AddContributor | ClearContributor
