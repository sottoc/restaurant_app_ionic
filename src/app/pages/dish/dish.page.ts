import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
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
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
     this.back_params = JSON.stringify(params.back_params);
     this.dish_id = params.id;
     this.image_url = params.image_url ? params.image_url : '../../../assets/imgs/logo-black.png';
     this.dish_name = params.name;
     this.dish_price = params.price;
     this.dish_detail = params.detail != 'null' ? params.detail : '';
     this.dish_favorite_checked = params.favorite_checked;
    });
  }

  ngOnInit() {
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

}
