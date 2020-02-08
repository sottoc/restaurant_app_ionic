import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';;
import { ModalController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';

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
  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public restApi: RestService
  ) {
    this.lang_en = this.translate.currentLang == 'en';
    // this.categories = [
    //   { id: 1, name: 'Pepperoni', isChecked: true },
    //   { id: 2, name: 'Pepperoni', isChecked: false },
    //   { id: 3, name: 'Pepperoni', isChecked: true },
    // ];
    this.getCategories();
  }

  ngOnInit() {}

  async getCategories() {
    try {
      this.loading = true;
      let res: any = await this.restApi.getCategories();
      this.categories = res.data;
      this.categories.forEach(element => {
        element.isChecked = true;
      });
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  clickCate(id) {
    this.categories.forEach(element => {
      if (element.id == id) {
        element.isChecked = !element.isChecked;
      }
    });
  }

}
