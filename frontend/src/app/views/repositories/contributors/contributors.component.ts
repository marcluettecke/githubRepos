import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../../../models/UserInfo";
import {DataStorageService} from "../../../services/data-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
             selector: 'app-contributors',
             templateUrl: './contributors.component.html',
             styleUrls: ['./contributors.component.scss']
           })
export class ContributorsComponent implements OnInit {
  testData: Object
  contributors: string[]
  contributorsInfo: UserInfo[] = []
  name: string
  owner: string

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params.owner
      this.owner = params.repo
    })
    this.dataStorageService.scrapeContributors(this.name, this.owner).subscribe((response: string[]) => {
      this.contributors = response
      this.contributors.map(el => {
        this.dataStorageService.getSingleUserInfo(el).subscribe(userResponse => {
          this.contributorsInfo.push(userResponse)
        })
      })
    })
  }

}
