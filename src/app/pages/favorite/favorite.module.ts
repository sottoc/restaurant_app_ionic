import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../../components/components.module';
import { FavoritePageRoutingModule } from './favorite-routing.module';
import { FavoritePage } from './favorite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ComponentsModule,
    FavoritePageRoutingModule
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
