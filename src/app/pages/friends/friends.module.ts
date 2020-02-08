import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../../components/components.module';
import { FriendsPageRoutingModule } from './friends-routing.module';
import { FriendsPage } from './friends.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ComponentsModule,
    FriendsPageRoutingModule
  ],
  declarations: [FriendsPage]
})
export class FriendsPageModule {}
