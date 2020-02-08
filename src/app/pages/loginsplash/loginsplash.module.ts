import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../../components/components.module';
import { LoginsplashPageRoutingModule } from './loginsplash-routing.module';
import { LoginsplashPage } from './loginsplash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule.forChild(),
    LoginsplashPageRoutingModule
  ],
  declarations: [LoginsplashPage]
})
export class LoginsplashPageModule {}
