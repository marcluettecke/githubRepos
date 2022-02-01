import {ActionReducerMap} from "@ngrx/store";

import * as fromContributor from '../views/repositories/contributors/store/contributors.reducer'
import * as fromRepos from '../views/repositories/overview/store/repos.reducer'
import * as fromSelection from '../views/repositories/overview/store/selection.reducer'

export interface AppState {
  contributors: fromContributor.ContributorsState
  repos: fromRepos.RepoState
  selection: fromSelection.SelectionState
}

export const appReducer: ActionReducerMap<AppState, any> = {
  contributors: fromContributor.contributorsReducer,
  repos: fromRepos.reposReducer,
  selection: fromSelection.selectionReducer
}
