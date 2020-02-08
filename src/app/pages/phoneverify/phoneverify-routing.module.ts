import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneverifyPage } from './phoneverify.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneverifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneverifyPageRoutingModule {}
