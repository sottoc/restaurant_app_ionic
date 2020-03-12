import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  api_url = environment.api_url
  lang : string
  loading : boolean = false
  logo_url : any
  name: string
  profile: any
  favorite_restaurants : any = []
  favorite_dishes : any = []
  selected_dishes : boolean = false
  followers = 0
  followings = 0
  constructor(
    private translate: TranslateService,
    private storage: Storage,
    public restApi: RestService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController,
  ) { 
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile => {
      profile = JSON.parse(profile);
      this.profile = profile;
      this.logo_url = profile.logo_url ? this.api_url + profile.logo_url : null;
      this.name = profile.name;
      this.loading = true;
      this.getFollows();
      this.getFavorites(1);
    });
  }

  ngOnInit() {
  }

  async getFollows() {
    try {
      let res: any = await this.restApi.getFollows(this.profile.id);
      this.followers = res.followers[0].count;
      this.followings = res.followings[0].count;
    } catch(err) {
      console.log(err);
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 2000
    });
    toast.present();
  }

  async getFavorites(type) {
    try {
      let res: any = await this.restApi.getFavorites(this.profile.id, type);
      let favorites_data = res.data;
      favorites_data.forEach(element => {
        if (type == 1) {
          element.image_url = element.image_url ? this.api_url + element.image_url : '../../../assets/imgs/empty.png';
          element.category_name = element.category_name ? element.category_name : '';
        } else {
          element.image_url = element.image_url ? this.api_url + element.image_url : '../../../assets/imgs/logo-black.png';
        }
        element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/logo-black.png';
        element.favorite_checked = true;
        element.distance = 5;
      });
      if (type == 1) {
        this.favorite_restaurants = favorites_data;
      } else {
        this.favorite_dishes = favorites_data;
      }
      this.loading = false;
    } catch(err) {
      console.log(err);
    }
  }

  switchDishRest(field) {
    this.loading = true;
    if (field == 'dish') {
      this.getFavorites(2);
      this.selected_dishes = true;
    } else {
      this.getFavorites(1);
      this.selected_dishes = false;
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
      let index = -1;
      if (type == 1) {
        this.favorite_restaurants.forEach((item, i) => {
          if (item.id == relative_id) {
            index = i;
          }
        });
        this.favorite_restaurants.splice(index, 1);
      } else {
        this.favorite_dishes.forEach((item, i) => {
          if (item.id == relative_id) {
            index = i;
          }
        });
        this.favorite_dishes.splice(index, 1);
      }
    } else { // if failed
      this.presentToast(res.result);
    }
    loading.dismiss();
  }

  async visitRestaurant(id, image_url, logo_url, name, category_name, favorite_checked) {
    // let options : NativeTransitionOptions = {
    //   direction: 'left',
    //   duration: 400,
    //   slowdownfactor: -1,
    //   iosdelay: 50
    // }
    // this.nativePageTransitions.slide(options);
    this.profile.restaurant_id = id;
    await this.storage.set("user_profile", JSON.stringify(this.profile));
    this.navCtrl.navigateBack('/restaurant', { queryParams: 
      {
        id : id,
        image_url : image_url,
        logo_url : logo_url,
        name : name,
        category_name : category_name,
        favorite_checked : favorite_checked,
        from_where : 'favorite'
      }
    });
  }

  visitDish(id, name, price, image_url, detail, favorite_checked) {
    this.navCtrl.navigateBack('/dish', { queryParams: 
      {
        id: id,
        name: name,
        price: price,
        image_url: image_url,
        detail: detail,
        favorite_checked: favorite_checked,
        back_params: null
      }
    });
  }

}
