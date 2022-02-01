import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {API_URL} from "../env";
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {map} from "rxjs/operators";
import {AllRepositoryInfo} from "../models/RepositoryInfo";


@Injectable({
              providedIn: 'root'
            })
export class DataStorageService {


  constructor(private http: HttpClient) {
  }

  fetchAllRepos(amount: number, offset: string = ''): Observable<AllRepositoryInfo> {
    const request = `query {
          search(query: "is:public", type: REPOSITORY, first: ${amount} ${offset ? ', after: ' + '"' + offset + '"' : ''}) {
            repositoryCount
            pageInfo {
              endCursor
              hasNextPage
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
    console.log(request)
    return this.http.post<any>(environment.githubApiUrl, {query: request}, {
                                 headers: {Authorization: `bearer ${environment.githubAccessToken}`}
                               }
    ).pipe(
      map(el => {
        return {
          count: el.data.search.repositoryCount,
          endCursor: el.data.search.pageInfo.endCursor,
          data: el.data.search.edges.map((item:
                                            {
                                              node:
                                                {
                                                  createdAt: string,
                                                  description: string,
                                                  homepageUrl: string,
                                                  name: string,
                                                  nameWithOwner: string,
                                                  owner: {
                                                    avatarUrl: string
                                                  },
                                                  updatedAt: string
                                                }
                                            }) => {
            return {
              name: item.node.name,
              owner: item.node.nameWithOwner.split('/')[0],
              avatarUrl: item.node.owner.avatarUrl,
              description: item.node.description,
              createdAt: new Date(item.node.createdAt),
              updatedAt: new Date(item.node.updatedAt),
              homepageUrl: item.node.homepageUrl
            }
          })

        }
      })
    )
  }

  scrapeContributors(owner: string, repo: string) {
    return this.http.get<string[]>(`${API_URL}repositories/${owner}/${repo}/contributors`)
  }

  getSingleUserInfo(username: string): Observable<UserInfo> {
    const request = `
      {
        user(login: "${username}"){
          name,
          avatarUrl,
          company,
          email,
          location,
          websiteUrl
          repositories (first: 3, orderBy:{field:STARGAZERS, direction: DESC}) {
            edges {
              node {
                name,
                url
              }
            }
          }
        }
      }
    `
    return this.http.post<any>(environment.githubApiUrl, {query: request}, {
                                 headers: {Authorization: `bearer ${environment.githubAccessToken}`}
                               }
    ).pipe(
      map(el => {
        return {
          name: el.data.user.name,
          avatarUrl: el.data.user.avatarUrl,
          company: el.data.user.company,
          email: el.data.user.email,
          location: el.data.user.location,
          websiteUrl: el.data.user.websiteUrl,
          repositories: el.data.user.repositories.edges.map((repo: { name: string, url: string }) => {
            return {name: repo.name, url: repo.url}
          })
        }
      })
    )
  }

}
