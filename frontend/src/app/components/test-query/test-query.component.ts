import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
             selector: 'app-test-query',
             templateUrl: './test-query.component.html',
             styleUrls: ['./test-query.component.scss']
           })
export class TestQueryComponent implements OnInit {
  accessToken = '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'
  baseUrl = 'https://api.github.com/graphql'
  headers = {
    'Content-Type': "application/json",
    Authentication: "bearer " + this.accessToken
  }
  body = `query {
            user(login: "ashutosh1919") {
              issues(last: 10, orderBy: {field: CREATED_AT, direction: DESC}){
                nodes{
                  title,
                  body,
                  closedAt
                }
              }
            }
          }
        `

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.http.post(this.baseUrl, {query: this.body}, {
      headers: {Authorization: `bearer ${this.accessToken}`}
    }).subscribe(response => {
                   console.log(response)
                 }
    )

  }
}
