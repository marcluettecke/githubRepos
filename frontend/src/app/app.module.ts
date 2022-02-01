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

@NgModule({
            declarations: [
              AppComponent,
              OverviewComponent,
              ContributorsComponent,
              RepoTableComponent,
              HeaderComponent,
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              StoreModule.forRoot({}, {}),
              BrowserAnimationsModule,
              MaterialModule,
              HttpClientModule,
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
