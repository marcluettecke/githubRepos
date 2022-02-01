import {AllRepositoryInfo} from "../../../../models/RepositoryInfo";
import * as ReposActions from "./repos.actions";

export interface RepoState {
  repos: AllRepositoryInfo
}

const initialState: RepoState = {
  repos: {count: 0, endCursor: '', data: []}
}

export function reposReducer(state: RepoState = initialState,
                             action: ReposActions.ReposActions): RepoState {
  switch (action.type) {
    case ReposActions.GETREPOS:
      const newRepoState = {
        count: action.payload.count,
        endCursor: action.payload.endCursor,
        data: [...action.payload.data]
      }
      return {...state, repos: {...newRepoState}}
    default:
      return state
  }
}
