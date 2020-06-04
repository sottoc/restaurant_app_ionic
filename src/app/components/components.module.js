import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { DishModalComponent } from './dish-modal/dish-modal.component';

const components = [
	HeaderComponent,
	FooterComponent,
	FilterModalComponent,
	DishModalComponent
]
@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TranslateModule.forChild(),
	],
	declarations: [
		...components,
	],
	exports: [
		...components,
	],
	entryComponents: [
		FilterModalComponent,
		DishModalComponent
	]
})
export class ComponentsModule { }
