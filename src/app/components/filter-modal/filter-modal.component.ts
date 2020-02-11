import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';;
import { ModalController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  api_url = environment.api_url
  loading: boolean = false
  lang_en : boolean
  categories: any = []
  selected_category_ids: any = []
  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public restApi: RestService,
    private storage: Storage,
  ) {
    this.lang_en = this.translate.currentLang == 'en';
    // this.categories = [
    //   { id: 1, name: 'Pepperoni', isChecked: true },
    //   { id: 2, name: 'Pepperoni', isChecked: false },
    //   { id: 3, name: 'Pepperoni', isChecked: true },
    // ];
    this.setCategories();
  }

  ngOnInit() {}

  async setCategories() {
    let categories = await this.storage.get("categories");
    this.categories = JSON.parse(categories);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  clickCate(id) {
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == id) {
        this.categories[i].isChecked = !this.categories[i].isChecked;
        this.storage.set("categories", JSON.stringify(this.categories));
        break;
      }
    }
  }

}
