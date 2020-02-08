import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferdetailPage } from './offerdetail.page';

const routes: Routes = [
  {
    path: '',
    component: OfferdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferdetailPageRoutingModule {}
