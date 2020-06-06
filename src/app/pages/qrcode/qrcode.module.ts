import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodePageRoutingModule } from './qrcode-routing.module';

import { QrcodePage } from './qrcode.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [QrcodePage]
})
export class QrcodePageModule {}
