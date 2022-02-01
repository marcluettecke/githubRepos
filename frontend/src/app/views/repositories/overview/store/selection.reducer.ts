import {Selection} from "../../../../models/Selection";
import * as SelectionActions from "./selection.actions";

export interface SelectionState {
  selection: Selection
}

const initialState: SelectionState = {
  selection: {owner: '', repo: ''}
}

export function selectionReducer(state: SelectionState = initialState,
                                 action: SelectionActions.SelectionActions): SelectionState {
  switch (action.type) {
    case SelectionActions.CHANGESELECTION:
      const newSelectionState = {
        owner: action.payload.owner,
        repo: action.payload.repo,
      }
      return {...state, selection: {...newSelectionState}}
    default:
      return state
  }
}
