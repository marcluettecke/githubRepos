import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataStorageService} from "../../services/data-storage.service";

@Component({
             selector: 'app-test-query',
             templateUrl: './test-query.component.html',
             styleUrls: ['./test-query.component.scss']
           })
export class TestQueryComponent implements OnInit {
  testData: Object

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    // this.dataStorageService.fetchAllRepos().subscribe(response => {
    //   this.testData = response
    //   console.log(this.testData)
    // })
    this.dataStorageService.scrapeContributors()
  }
}
