import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, IonSearchbar, NavController, ToastController, LoadingController } from '@ionic/angular';
import { FilterModalComponent } from '../../components/filter-modal/filter-modal.component';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

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
  // profile: any
  // city: any
  profile : any = {
    "id": 5,
    "email": "test@test.com",
    "username": "gus_programmer",
    "password": "e10adc3949ba59abbe56e057f20f883e",
    "city": "10",
    "name": "Gus Developer",
    "bio": "iOS/Android programmer",
    "logo_url": "/storage/user_logo/1584585087201.jpg_1584585089.jpeg",
    "country_code": "663",
    "phone_number": "564976312",
    "phone_verified": 0,
    "status": 1,
    "created_at": null,
    "updated_at": null,
    "followers": 0,
    "followings": 0,
    "favorites":[]
  }
  city : any = "10"
  @ViewChild('searchInput', {static: false}) searchInput: IonSearchbar;
  constructor(
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastController: ToastController,
    public restApi: RestService,
    private storage: Storage,
    private nativePageTransitions: NativePageTransitions,
    private loadingController: LoadingController,
    private cdref: ChangeDetectorRef
  ) {
    this.lang = this.translate.currentLang;
    this.loading = true;
    // this.storage.get('user_profile').then(profile =>{
    //   profile = JSON.parse(profile);
    //   this.profile = profile;
    //   this.city = profile.city;
    //   this.getRestaurants();
    // });
    this.init();
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

  async init() {
    let res: any = await this.restApi.getCategories(this.city);
    let categories = res.data;
    categories.forEach(element => {
      element.isChecked = true;
    });
    await this.storage.set("categories", JSON.stringify(categories));
    this.getRestaurants();
  }

  async getRestaurants() {
    try {
      let res: any = await this.restApi.getRestaurants(this.city);
      this.tempRestaurant = res.data;
      this.tempRestaurant = this.tempRestaurant.filter(item => item.is_open == 1);
      this.tempRestaurant.forEach(element => {
        element.image_url = element.image_url ? this.api_url + element.image_url : '../../../assets/imgs/empty.png';
        element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/logo.png';
        element.favorite_checked = this.profile.favorites.filter(item => item.relative_id == element.id && item.type == 1).length > 0 ? true : false;
        element.distance = 12,
        element.category_name = element.categories.length > 0 ? element.categories[0].name : '';
      });
      this.refreshRestaurants();
    } catch(err) {
      console.log(err);
      this.presentToast(err.error);
    }
  }

  async refreshRestaurants() {
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
    this.cdref.detectChanges();
  }

  async showFilterModal() {
    const modal = await this.modalCtrl.create({
      component: FilterModalComponent,
      cssClass: 'filter-modal',
    });
    modal.onDidDismiss().then(data => {
      this.loading = true;
      this.refreshRestaurants();
    });
    return await modal.present();
  }

  async search(e) {
    let key = e.target.value;
    if (!this.isValid(key)) {
      this.presentToast('Cannot search for special character');
    } else {
      key = key.toLowerCase();
      this.loading = true;
      let res: any = await this.restApi.getRestaurantsByKey(this.city, key);
      this.tempRestaurant = res.data;
      this.refreshRestaurants();
    }
  }

  async updateFavorite(favorite_checked, relative_id, type) {
    const loading = await this.loadingController.create({
        message: favorite_checked ? 'Removing from favorite ...' : 'Setting as favorite ...',
    });
    await loading.present();
    const params = {"user_id" : this.profile.id, "relative_id" : relative_id, "type" : type };
    let res: any = favorite_checked ? await this.restApi.removeFavorite(params) : await this.restApi.setFavorite(params);
    if (res.code == 200) {  // if success
      // update profile favorites
      if (favorite_checked == false) { 
        this.profile.favorites.push({ relative_id: relative_id, type: type});
      } else {
        let index = -1;
        this.profile.favorites.forEach((item, i) => {
          if (item.relative_id == relative_id && item.type == type) {
            index = i;
          }
        });
        this.profile.favorites.splice(index, 1);
      }
      await this.storage.set("user_profile", JSON.stringify(this.profile));
      // update UI
      this.restaurants.forEach(e => {
        if (e.id == relative_id) {
          e.favorite_checked = !e.favorite_checked;
        }
      });
    } else { // if failed
      this.presentToast(res.result);
    }
    loading.dismiss();
  }

  showList() {
    this.display_grid_state = false;
  }

  showGrid() {
    this.display_grid_state = true;
  }

  async visitRestaurant(id, image_url, logo_url, name, category_name, favorite_checked) {
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.profile.restaurant_id = id;
    await this.storage.set("user_profile", JSON.stringify(this.profile));
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

  isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }

}
