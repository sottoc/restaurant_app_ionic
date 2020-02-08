import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginsplashPage } from './loginsplash.page';

const routes: Routes = [
  {
    path: '',
    component: LoginsplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginsplashPageRoutingModule {}
