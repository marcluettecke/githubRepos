import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Angular Material
import {MatSliderModule} from '@angular/material/slider';

import {HttpClientModule} from '@angular/common/http';
// Custom Components
import {TestQueryComponent} from './components/test-query/test-query.component';

@NgModule({
            declarations: [
              AppComponent,
              TestQueryComponent,
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              StoreModule.forRoot({}, {}),
              BrowserAnimationsModule,
              MatSliderModule,
              HttpClientModule,

            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
