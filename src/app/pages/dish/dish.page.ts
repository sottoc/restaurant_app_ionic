import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestService } from '../../services/rest.service';
import { DishModalComponent } from '../../components/dish-modal/dish-modal.component';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  lang : string
  dish_id: any
  image_url: string
  dish_name: string
  dish_price: any
  dish_favorite_checked: boolean = true
  dish_detail: string 
  back_params : any = {}
  profile: any
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
    });

    this.storage.get('user_profile').then(profile =>{
      profile = JSON.parse(profile);
      this.profile = profile;
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

  async openDishModal() {
    let modal = await this.modalCtrl.create({
      component: DishModalComponent,
      componentProps: { dish_id: this.dish_id },
      cssClass: 'dish-modal',
      backdropDismiss:false,
    });
    modal.onDidDismiss().then(data => {
      let dish = data.data;
      this.updateDish(dish.id, dish.name, dish.price, dish.image_url, dish.detail, dish.favorite_checked);
    });
    return await modal.present();
  }

  async sendOpinion(form) {
    try {
      const { opinion } = form.control.value;
      console.log(opinion);

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
