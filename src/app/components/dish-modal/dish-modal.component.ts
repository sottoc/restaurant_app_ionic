import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavParams, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss'],
})
export class DishModalComponent implements OnInit {
  lang : string
  loading : boolean = false
  api_url = environment.api_url
  menus : any = []
  dishes : any = []
  restaurant_id : any
  slideOpts : any;
  initial_dish_id : any;
  active_dish: any;
  profile : any
  @ViewChild('dish_slides', { static: false }) dish_slides: IonSlides;
  constructor(
    private translate: TranslateService,
    public restApi: RestService,
    private storage: Storage,
    public navParams: NavParams,
    private modalController: ModalController,
  ) { 
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile =>{
      profile = JSON.parse(profile);
      this.profile = profile;
      this.restaurant_id = parseInt(profile.restaurant_id);
      this.initial_dish_id = navParams.get('dish_id');
      this.getMenus();
    });
  }

  ngOnInit() {
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
        dish.image_url = dish.image_url ? this.api_url + dish.image_url : '../../../assets/imgs/logo-black.png';
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
      console.log(this.active_dish);
    });
    
  }

  async dismiss() {
    await this.modalController.dismiss(this.active_dish);
  }

}
