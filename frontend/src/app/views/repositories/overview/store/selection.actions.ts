import {Action} from '@ngrx/store'
import {Selection} from "../../../../models/Selection";

export const CHANGESELECTION = 'CHANGESELECTION'

export class ChangeSelection implements Action {
  readonly type = CHANGESELECTION

  constructor(public payload: Selection) {
  }
}

export type SelectionActions = ChangeSelection
