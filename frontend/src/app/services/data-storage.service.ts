import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {API_URL} from "../env";


@Injectable({
              providedIn: 'root'
            })
export class DataStorageService {
  body = `query {
          search(query: "is:public", type: REPOSITORY, first: 5) {
            repositoryCount
            pageInfo {
              endCursor
              startCursor
            }
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    avatarUrl
                  }
                  nameWithOwner
                  description
                  createdAt
                  updatedAt
                  homepageUrl
                }
              }
            }
          }
        }`

  constructor(private http: HttpClient) {
  }

  fetchAllRepos() {
    return this.http.post(environment.githubApiUrl, {query: this.body}, {
                            headers: {Authorization: `bearer ${environment.githubAccessToken}`}
                          }
    )
  }

  scrapeContributors(path: string = 'https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/') {
    return this.http.get(`${API_URL}/contributors`)
  }
}
