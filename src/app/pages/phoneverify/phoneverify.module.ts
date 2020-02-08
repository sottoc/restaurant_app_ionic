import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../../components/components.module';
import { PhoneverifyPageRoutingModule } from './phoneverify-routing.module';
import { PhoneverifyPage } from './phoneverify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule.forChild(),
    PhoneverifyPageRoutingModule
  ],
  declarations: [PhoneverifyPage]
})
export class PhoneverifyPageModule {}
