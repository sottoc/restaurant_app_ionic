import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestService } from '../../services/rest.service';
// import { DishModalComponent } from '../../components/dish-modal/dish-modal.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  lang : string
  loading : boolean = false
  api_url = environment.api_url
  dish_id: any
  image_url: string
  dish_name: string
  dish_price: any
  dish_favorite_checked: boolean = true
  dish_detail: string
  restaurant_id: any 
  back_params : any = {}
  profile: any

  menus : any = []
  dishes : any = []
  slideOpts : any;
  initial_dish_id : any;
  active_dish: any;
  @ViewChild('dish_slides', { static: false }) dish_slides: IonSlides;
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private storage: Storage,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    public restApi: RestService,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
     this.back_params = JSON.stringify(params.back_params);
     this.dish_id = params.id;
     this.image_url = params.image_url;
     this.dish_name = params.name;
     this.dish_price = params.price;
     this.dish_detail = params.detail != 'null' ? params.detail : '';
     this.dish_favorite_checked = params.favorite_checked;
     this.restaurant_id = params.restaurant_id;
    });

    this.storage.get('user_profile').then(profile =>{
      profile = JSON.parse(profile);
      this.profile = profile;
      this.initial_dish_id = this.dish_id;
      this.getMenus();
    });
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 5000
    });
    toast.present();
  }

  async getMenus() {
    try {
      this.loading = true;
      let res: any = await this.restApi.getMenus(this.restaurant_id);
      this.menus = res.data;
      this.menus.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (b.id > a.id) return -1;
      });
      if (this.menus && this.menus.length) {
        this.getDishes();
      } else {
        this.loading = false;
      }
    } catch(err) {
      this.loading = false;
      console.log(err);
    }
  }

  getDishes() {
    let index = 0;
    this.menus.forEach(menu => {
      for (var i = 0; i < menu.items.length; i++) {
        let dish = menu.items[i];
        dish.index = index;
        dish.favorite_checked = this.profile.favorites.filter(item => item.relative_id == dish.id && item.type == 2).length > 0 ? true : false;
        dish.image_url = dish.image_url ? this.api_url + dish.image_url : '../../../assets/imgs/logo.png';
        dish.price = dish.price % 100 == 0 ? dish.price / 100 : (dish.price / 100).toFixed(2);
        this.dishes.push(dish);
        index++;
      }
    });
    
    let initial_index = this.dishes.filter(dish => dish.id == this.initial_dish_id)[0].index;
    this.slideOpts = {
      initialSlide: initial_index,
      slidesPerView: 1,
      speed: 300
    };
    this.loading = false;
  }

  slideDidChange() {
    this.dish_slides.getActiveIndex().then((index) => {
      this.active_dish = this.dishes.filter(dish => dish.index == index)[0];
    });
  }

  // async openDishModal() {
  //   let modal = await this.modalCtrl.create({
  //     component: DishModalComponent,
  //     componentProps: { dish_id: this.dish_id, restaurant_id: this.restaurant_id },
  //     cssClass: 'dish-modal',
  //     backdropDismiss:false,
  //   });
  //   modal.onDidDismiss().then(data => {
  //     let dish = data.data;
  //     this.updateDish(dish.id, dish.name, dish.price, dish.image_url, dish.detail, dish.favorite_checked);
  //   });
  //   return await modal.present();
  // }

  async sendOpinion(form) {
    try {
      const { opinion } = form.control.value;
      const params = {
        user_id: this.profile.id,
        dish_id: this.dish_id,
        opinion: opinion
      }
      const res : any = await this.restApi.postDishOpinion(params);
      if (res.code == 200) {
        this.presentToast(String(res.result) == '1' ? 'Updated successfully' : 'Posted successfully');
      } else {
        this.presentToast('Failed');
      }
    } catch (err) {
      console.error("ERROR", err)
    }
  }

  setFavoriteDish() {
    this.dish_favorite_checked = !this.dish_favorite_checked;
  }

  updateDish(id, name, price, image_url, detail, favorite_checked) {
     this.dish_id = id;
     this.image_url = image_url;
     this.dish_name = name;
     this.dish_price = price;
     this.dish_detail = detail != 'null' ? detail : '';
     this.dish_favorite_checked = favorite_checked;
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
      if (type == 2) {
        this.dish_favorite_checked = !favorite_checked;
      }
    } else { // if failed
      this.presentToast(res.result);
    }
    loading.dismiss();
  }

}
