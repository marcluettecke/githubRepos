import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RepositoryInfo} from "../../../models/RepositoryInfo";
import {DataStorageService} from "../../../services/data-storage.service";
import {Subscription} from "rxjs";
import * as RepoActions from './store/repos.actions'
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {UserInfo} from "../../../models/UserInfo";

@Component({
             selector: 'app-overview',
             templateUrl: './overview.component.html',
             styleUrls: ['./overview.component.scss']
           })
export class OverviewComponent implements OnInit {
  mockData: UserInfo = {
    name: 'Max Mustermann',
    avatarUrl: 'https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?forcejpeg=true',
    company: 'Random Company',
    email: 'test.email@gmail.com',
    location: 'San Francisco, USA',
    websiteUrl: 'www.google.com',
    repositories: [
      {
        name: 'randomRepo1',
        url: 'https://github.com/marcluettecke/googleTaxonomy'
      },
      {
        name: 'randomRepo2',
        url: 'https://github.com/marcluettecke/googleTaxonomy'
      },
      {
        name: 'randomRepo3',
        url: 'https://github.com/marcluettecke/googleTaxonomy'
      },

    ]
  }


  contributors: string[]
  dataSource = new MatTableDataSource<RepositoryInfo>()
  endCursor: string
  repoSub: Subscription
  fetchAmount = 5

  constructor(private dataStorageService: DataStorageService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('repos').subscribe(appState => {
      if (appState && appState.repos.count !== 0) {
        this.dataSource = new MatTableDataSource<RepositoryInfo>(appState.repos.data)
      } else {
        // this.dataSource.paginator = this.paginator
        this.repoSub = this.dataStorageService.fetchAllRepos(this.fetchAmount).subscribe(response => {
          this.dataSource = new MatTableDataSource<RepositoryInfo>(response.data)
          this.endCursor = response.endCursor
          this.store.dispatch(new RepoActions.AddRepos(response))
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onTableScroll(event: any) {
    const tableViewHeight = event.target.offsetHeight // viewport
    const tableScrollHeight = event.target.scrollHeight // length of all table
    const scrollLocation = event.target.scrollTop; // how far user scrolled


    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.dataStorageService.fetchAllRepos(this.fetchAmount, this.endCursor)
        .subscribe(response => {
                     const newData = [...this.dataSource.data, ...response.data]
                     this.dataSource = new MatTableDataSource(newData)
                     this.store.dispatch(new RepoActions.AddRepos({
                                                                    count: response.count,
                                                                    endCursor: response.endCursor,
                                                                    data: newData
                                                                  }))
                   }
        )

    }

  }


}
