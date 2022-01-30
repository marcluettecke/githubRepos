import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment'


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

  async scrapeContributors(path: string = 'https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/') {
    // const fullPath = path + 'graphs/contributors'
    const fullPath = 'https://example.com'
    this.http.get(fullPath, {
      headers: new HttpHeaders({
                                 'Content-Type': 'application/json'
                               })
    }).subscribe(response => {
      console.log(response)
    })
    // const response = await fetch(fullPath);
    // const text = await response.text();
    // const terms = parse(text);
    // console.log(terms.innerHTML)
    // console.log(terms)
    // return terms
  }
}
