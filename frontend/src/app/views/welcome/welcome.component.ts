import {Component, OnInit} from '@angular/core';
import {faFilePowerpoint} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedinIn} from "@fortawesome/free-brands-svg-icons"

@Component({
             selector: 'app-welcome',
             templateUrl: './welcome.component.html',
             styleUrls: ['./welcome.component.scss']
           })
export class WelcomeComponent implements OnInit {
  faLinkedIn = faLinkedinIn
  faGithub = faGithub
  faFilePowerpoint = faFilePowerpoint


  constructor() {
  }

  ngOnInit(): void {
  }

}
