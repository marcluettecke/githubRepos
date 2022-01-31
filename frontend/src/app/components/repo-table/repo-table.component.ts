import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {RepositoryInfo} from "../../models/RepositoryInfo";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
             selector: 'app-repo-table',
             templateUrl: './repo-table.component.html',
             styleUrls: ['./repo-table.component.scss']
           })
export class RepoTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['avatarUrl', 'name', 'owner', 'description', 'createdAt', 'updatedAt', 'homepageUrl']

  @Input() set data(value: RepositoryInfo[]) {
    this.dataSource = new MatTableDataSource<RepositoryInfo>(value)
  }

  dataSource = new MatTableDataSource<RepositoryInfo>()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
