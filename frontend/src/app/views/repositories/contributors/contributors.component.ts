import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInfo} from "../../../models/UserInfo";
import {DataStorageService} from "../../../services/data-storage.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as ContributorsActions from "./store/contributors.actions";
import * as SelectionActions from '../overview/store/selection.actions'
import {Subscription} from "rxjs";

@Component({
             selector: 'app-contributors',
             templateUrl: './contributors.component.html',
             styleUrls: ['./contributors.component.scss']
           })
export class ContributorsComponent implements OnInit, OnDestroy {
  contributors: string[]
  contributorsInfo: UserInfo[] = []
  name: string
  owner: string
  storeSubscriptionContributors: Subscription
  paramsSubscription: Subscription
  dataStorageSubscription: Subscription
  loading = true

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {


    this.storeSubscriptionContributors = this.store.select('contributors').subscribe(appState => {
      if (appState) {
        this.contributorsInfo = appState.contributors
      }
      if (this.contributorsInfo.length === 0) {
        this.paramsSubscription = this.route.params.subscribe(params => {
          this.name = params.owner
          this.owner = params.repo
        })
        this.dataStorageSubscription = this.dataStorageService.scrapeContributors(this.name, this.owner).subscribe((response: string[]) => {
          this.contributors = response
          this.contributors.map(el => {
            this.dataStorageService.getSingleUserInfo(el).subscribe(userResponse => {
              this.store.dispatch(new ContributorsActions.AddContributor(userResponse))
            })
          })
          this.loading = false
        })
      }
    })
  }

  ngOnDestroy() {
    this.storeSubscriptionContributors.unsubscribe()
    this.paramsSubscription.unsubscribe()
    this.dataStorageSubscription.unsubscribe()
  }

}
