import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonSlides, NavController, ToastController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

const Item_Height = 139;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  lang : string
  api_url = environment.api_url
  loading: boolean = false
  restaurant_id : any
  cover_img_url: string
  logo_url: string
  restaurant_favorite_checked: boolean
  restaurant_name: string
  restaurant_cate: string
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    speed: 300
  };
  menus : any = []
  selected_menu_id = 0
  dishes : any = []
  @ViewChild('dish_content', { static: false }) dish_content: IonContent;
  @ViewChild('menu_slides', { static: false }) menu_slides: IonSlides;
  clicked_menu_status : boolean = false
  params: any
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public restApi: RestService,
    private toastController: ToastController,
    private storage: Storage,
    private cdref: ChangeDetectorRef
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
      this.params = params;
      this.restaurant_id = params.id;
      this.cover_img_url = params.image_url;
      this.logo_url = params.logo_url;
      this.restaurant_name = params.name;
      this.restaurant_cate = params.category_name;
      this.restaurant_favorite_checked = params.favorite_checked;
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
      await this.storage.set("restaurant_id", this.restaurant_id);
      this.loading = true;
      let res: any = await this.restApi.getMenus(this.restaurant_id);
      this.menus = res.data;
      this.menus.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (b.id > a.id) return -1;
      });
      if (this.menus && this.menus.length) {
        this.selected_menu_id = this.menus[0].id;
        this.getDishes();
      } else {
        this.loading = false;
      }
    } catch(err) {
      console.log(err);
    }
  }

  getDishes() {
    this.menus.forEach(menu => {
      for (var i = 0; i < menu.items.length; i++) {
        let dish = menu.items[i];
        dish.favorite_checked = true;
        dish.image_url = dish.image_url ? this.api_url + dish.image_url : dish.image_url;
        this.dishes.push(dish);
      }
    });
    this.loading = false;
    this.cdref.detectChanges();
  }

  setFavorite() {
    this.restaurant_favorite_checked = !this.restaurant_favorite_checked;
  }

  setFavoriteDish(dish_id) {
    for(var i = 0; i<this.dishes.length; i++) {
      this.dishes[i]
    }
    this.dishes.forEach((element) => {
      if (element.id == dish_id) {
        element.favorite_checked = !element.favorite_checked;
      }
    });
  }  

  selectMenu(menu_id) {
    this.clicked_menu_status = true;
    this.selected_menu_id = menu_id;
    let dishes = this.dishes.filter(e => e.menu_id == menu_id);
    if (dishes && dishes.length) {
      let dishes_count = 0;
      for (var i = 0; i < this.menus.length; i++) {
        if (this.menus[i].id == menu_id) {
          break;
        } else {
          dishes_count += this.menus[i].items.length;
        }
      }
      let x = 0, y = Math.floor(dishes_count/2) * Item_Height, duration = 500;
      this.dish_content.scrollToPoint(x, y, duration);
    }
    let selected_index = 0;
    for (var i = 0; i < this.menus.length; i++) {
      if (this.menus[i].id == this.selected_menu_id) {
        selected_index = i;
      }
    }
    this.menu_slides.getActiveIndex().then(index => {
      if (selected_index == index) {
        this.menu_slides.slidePrev(500);
      } else if (selected_index == index + 2) {
        this.menu_slides.slideNext(500);
      }
    });
    this.cdref.detectChanges();
  }

  scrollDishes(e) {
    if (!this.clicked_menu_status) {
      let len = Math.floor((e.detail.currentY + Item_Height / 3) / Item_Height) * 2;
      if (this.dishes[len]) {
        let menu_id = this.dishes[len].menu_id;
        this.menus.forEach((m, index) => {
          if (m.id == menu_id) {
            this.menu_slides.slideTo(index - 1, 500);
          }
        });
        this.selected_menu_id = menu_id;
        this.cdref.detectChanges();
      }
    }
  }

  scrollDishesEnd() {
    this.clicked_menu_status = false;
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
        back_params: this.params
      }
    });
  }
}
