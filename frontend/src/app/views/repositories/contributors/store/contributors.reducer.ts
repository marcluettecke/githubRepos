import {UserInfo} from "../../../../models/UserInfo";
import * as ContributorsActions from "./contributors.actions";

export interface ContributorsState {
  contributors: UserInfo[]
}

const initialState: ContributorsState = {
  contributors: []
}

export function contributorsReducer(state: ContributorsState = initialState,
                                    action: ContributorsActions.ContributorsActions): ContributorsState {
  switch (action.type) {
    case ContributorsActions.GETCONTRIBUTORS:
      const newContributor = {
        name: action.payload.name,
        avatarUrl: action.payload.avatarUrl,
        company: action.payload.company,
        email: action.payload.email,
        location: action.payload.location,
        websiteUrl: action.payload.websiteUrl,
        repositories: [...action.payload.repositories],
      }
      const newContributors = [...state.contributors, newContributor]
      return {...state, contributors: newContributors}
    case ContributorsActions.CLEARCONTRIBUTORS:
      return {...state, contributors: []}
    default:
      return state
  }
}
