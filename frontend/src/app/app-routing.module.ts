import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from "./views/repositories/overview/overview.component";
import {ContributorsComponent} from "./views/repositories/contributors/contributors.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'repositories',
    pathMatch: 'full'
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
    component: OverviewComponent
  }
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
