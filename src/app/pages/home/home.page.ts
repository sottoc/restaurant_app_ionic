import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, IonSearchbar, NavController, ToastController } from '@ionic/angular';
import { FilterModalComponent } from '../../components/filter-modal/filter-modal.component';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  lang : string
  api_url = environment.api_url
  restaurants : any = []
  tempRestaurant: any = []
  display_grid_state : boolean = true
  loading: boolean = false
  selected_category_ids: any = []
  @ViewChild('searchInput', {static: false}) searchInput: IonSearchbar;
  constructor(
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastController: ToastController,
    public restApi: RestService,
    private storage: Storage,
  ) {
    this.lang = this.translate.currentLang;
    this.getRestaurants();
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 2000
    });
    toast.present();
  }

  async getRestaurants() {
    try {
      this.loading = true;
      let res: any = await this.restApi.getRestaurants();
      this.tempRestaurant = res.data;
      this.refreshRestaurants();
    } catch(err) {
      console.log(err);
    }
  }

  async refreshRestaurants() {
    this.tempRestaurant.forEach(element => {
      element.image_url = this.api_url + element.image_url;
      element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/logo-black.png';
      element.favorite_checked = false;
      element.distance = 12,
      element.category_name = element.categories.length > 0 ? element.categories[0].name : '';
    });
    this.restaurants = [];
    let categories = await this.storage.get("categories");
    categories = JSON.parse(categories);
    this.selected_category_ids = [];
    categories.forEach(item => {
      if (item.isChecked) {
        this.selected_category_ids.push(item.id);
      }
    });
    this.tempRestaurant.forEach(restaurant => {
      let len = restaurant.categories.length;
      for (var i = 0; i < len; i++) {
        if (this.selected_category_ids.includes(restaurant.categories[i].id)) {
          this.restaurants.push(restaurant);
          break;
        }
      }
    });
    this.loading = false;
  }

  async showFilterModal() {
    const modal = await this.modalCtrl.create({
      component: FilterModalComponent,
      cssClass: 'filter-modal',
    });
    modal.onDidDismiss().then(data => {
      this.refreshRestaurants();
    });
    return await modal.present();
  }

  isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }

  async search(e) {
    let key = e.target.value;
    if (!this.isValid(key)) {
      this.presentToast('Cannot search for special character');
    } else {
      key = key.toLowerCase();
      this.loading = true;
      let res: any = await this.restApi.getRestaurantsByKey(key);
      this.tempRestaurant = res.data;
      this.refreshRestaurants();
    }
  }

  setFavorite(id) {
    this.restaurants.forEach(e => {
      if (e.id == id) {
        e.favorite_checked = !e.favorite_checked;
      }
    });
  }

  showList() {
    this.display_grid_state = false;
  }

  showGrid() {
    this.display_grid_state = true;
  }

  visitRestaurant(id, image_url, logo_url, name, category_name, favorite_checked) {
    this.navCtrl.navigateBack('/restaurant', { queryParams: 
      {
        id : id,
        image_url : image_url,
        logo_url : logo_url,
        name : name,
        category_name : category_name,
        favorite_checked : favorite_checked
      }
    });
  }

}
