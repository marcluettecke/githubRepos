import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Angular Material
import {MaterialModule} from "./material.module";

import {HttpClientModule} from '@angular/common/http';
// Custom Components
import {OverviewComponent} from './views/repositories/overview/overview.component';
import {ContributorsComponent} from './views/repositories/contributors/contributors.component';
import {RepoTableComponent} from './components/repo-table/repo-table.component';
import {HeaderComponent} from './components/header/header.component';
import * as fromApp from './store/app.reducer'
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {UserCardComponent} from './components/user-card/user-card.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {WelcomeComponent} from './views/welcome/welcome.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

@NgModule({
            declarations: [
              AppComponent,
              OverviewComponent,
              ContributorsComponent,
              RepoTableComponent,
              HeaderComponent,
              UserCardComponent,
              LoadingSpinnerComponent,
              WelcomeComponent,
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              StoreModule.forRoot({}, {}),
              BrowserAnimationsModule,
              MaterialModule,
              HttpClientModule,
              FontAwesomeModule,
              StoreModule.forRoot({
                                    contributors: fromApp.appReducer.contributors,
                                    repos: fromApp.appReducer.repos,
                                    selection: fromApp.appReducer.selection
                                  }),
              !environment.production ? StoreDevtoolsModule.instrument() : [],

            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
