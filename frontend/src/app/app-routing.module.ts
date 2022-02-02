import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from "./views/repositories/overview/overview.component";
import {ContributorsComponent} from "./views/repositories/contributors/contributors.component";
import {WelcomeComponent} from "./views/welcome/welcome.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'repositories',
    component: OverviewComponent,
  },
  {
    path: 'repositories/:owner/:repo/contributors',
    component: ContributorsComponent
  },
  {
    path: '**',
    component: WelcomeComponent
  }
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
