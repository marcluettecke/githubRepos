import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataStorageService} from "../../../services/data-storage.service";
import {RepositoryInfo} from '../../../models/RepositoryInfo'
import {Router} from "@angular/router";

@Component({
             selector: 'app-overview',
             templateUrl: './overview.component.html',
             styleUrls: ['./overview.component.scss']
           })
export class OverviewComponent implements OnInit {
  repoSub: Subscription
  repositories: RepositoryInfo[]
  contributors: string[]

  constructor(private dataStorageService: DataStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.repoSub = this.dataStorageService.fetchAllRepos(5).subscribe(response => {
      this.repositories = response.data
    })
  }
}
