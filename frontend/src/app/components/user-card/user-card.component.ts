import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../../models/UserInfo";

@Component({
             selector: 'app-user-card',
             templateUrl: './user-card.component.html',
             styleUrls: ['./user-card.component.scss']
           })
export class UserCardComponent implements OnInit {
  @Input() userInfo: UserInfo
  @Input() contributorsLength: number
  @Input() currentIndex: number
  defaultImgUrl = 'https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?forcejpeg=true'

  constructor() {
  }

  ngOnInit(): void {
  }

}
