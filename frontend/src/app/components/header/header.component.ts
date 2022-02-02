import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {Router} from "@angular/router";

@Component({
             selector: 'app-header',
             templateUrl: './header.component.html',
             styleUrls: ['./header.component.scss']
           })
export class HeaderComponent implements OnInit {
  owner: string
  repo: string

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select('selection').subscribe(appState => {
      if (appState) {
        this.owner = appState.selection.owner
        this.repo = appState.selection.repo
      }
    })

  }

  handleNavigationClick() {
    this.router.navigate(['/repositories', this.owner, this.repo, 'contributors'])
  }

}
