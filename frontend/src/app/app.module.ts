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

@NgModule({
            declarations: [
              AppComponent,
              OverviewComponent,
              ContributorsComponent,
              RepoTableComponent,
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              StoreModule.forRoot({}, {}),
              BrowserAnimationsModule,
              MaterialModule,
              HttpClientModule,

            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
