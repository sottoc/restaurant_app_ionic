import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../../components/components.module';
import { AboutPageRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ComponentsModule,
    AboutPageRoutingModule
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}
