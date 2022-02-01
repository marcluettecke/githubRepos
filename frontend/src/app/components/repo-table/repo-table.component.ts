import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {RepositoryInfo} from "../../models/RepositoryInfo";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../services/data-storage.service";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import * as SelectionActions from '../../views/repositories/overview/store/selection.actions'
import {Router} from "@angular/router";

@Component({
             selector: 'app-repo-table',
             templateUrl: './repo-table.component.html',
             styleUrls: ['./repo-table.component.scss']
           })
export class RepoTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['avatarUrl', 'name', 'owner', 'description', 'createdAt', 'updatedAt', 'homepageUrl', 'contributors']
  repoSub: Subscription
  repositories: RepositoryInfo[]
  @Input() dataSource: MatTableDataSource<RepositoryInfo>
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  handleContributorsClick(owner: string, repo: string) {
    this.router.navigate(['/repositories', owner, repo, 'contributors'])
  }


}
