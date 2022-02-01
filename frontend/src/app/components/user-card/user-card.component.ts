import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../../models/UserInfo";

@Component({
             selector: 'app-user-card',
             templateUrl: './user-card.component.html',
             styleUrls: ['./user-card.component.scss']
           })
export class UserCardComponent implements OnInit {
  @Input() userInfo: UserInfo

  constructor() {
  }

  ngOnInit(): void {
  }

}
