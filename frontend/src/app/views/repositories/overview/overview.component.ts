import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RepositoryInfo} from "../../../models/RepositoryInfo";
import {DataStorageService} from "../../../services/data-storage.service";
import {Subscription} from "rxjs";
import * as RepoActions from './store/repos.actions'
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";

@Component({
             selector: 'app-overview',
             templateUrl: './overview.component.html',
             styleUrls: ['./overview.component.scss']
           })
export class OverviewComponent implements OnInit, OnDestroy {
  contributors: string[]
  dataSource = new MatTableDataSource<RepositoryInfo>()
  endCursor: string
  repoSub: Subscription
  fetchAmount = 15
  loading: boolean
  storeSubscriptionRepos: Subscription

  constructor(private dataStorageService: DataStorageService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loading = true
    this.store.select('repos').subscribe(appState => {
      if (appState.repos.count !== 0) {
        this.dataSource = new MatTableDataSource<RepositoryInfo>(appState.repos.data)
        this.loading = false
      } else {
        // this.dataSource.paginator = this.paginator
        this.repoSub = this.dataStorageService.fetchAllRepos(this.fetchAmount).subscribe(response => {
          this.dataSource = new MatTableDataSource<RepositoryInfo>(response.data)
          this.loading = false
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


    // If the user has scrolled within 2px of the bottom, add more data
    const buffer = 2;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      // this.loading = true
      this.dataStorageService.fetchAllRepos(this.fetchAmount, this.endCursor)
        .subscribe(response => {
                     if (this.endCursor !== response.endCursor) {
                       const newData = [...this.dataSource.data, ...response.data]
                       this.endCursor = response.endCursor
                       this.dataSource = new MatTableDataSource(newData)
                       this.store.dispatch(new RepoActions.AddRepos({
                                                                      count: response.count,
                                                                      endCursor: response.endCursor,
                                                                      data: newData
                                                                    }))
                     }

                   }
        )

    }

  }

  ngOnDestroy() {
    if (this.storeSubscriptionRepos) {
      this.storeSubscriptionRepos.unsubscribe()
    }
  }


}
