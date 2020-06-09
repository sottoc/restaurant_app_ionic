import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonSlides, NavController, ToastController, LoadingController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

const Item_Height = 139;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})

export class RestaurantPage implements OnInit {
  lang : string
  api_url = environment.api_url
  loading: boolean = true
  restaurant_id : any
  cover_img_url: string
  logo_url: string
  pdf_url: string
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
  profile : any
  from_where : any

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public restApi: RestService,
    private toastController: ToastController,
    private storage: Storage,
    private nativePageTransitions: NativePageTransitions,
    private loadingController: LoadingController,
    private cdref: ChangeDetectorRef,
    public previewAnyFile: PreviewAnyFile,
    private iab: InAppBrowser
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
      this.pdf_url = this.api_url + params.pdf_url;
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
        // dish.favorite_checked = this.profile.favorites.filter(item => item.relative_id == dish.id && item.type == 2).length > 0 ? true : false;
        dish.favorite_checked = false;
        dish.image_url = dish.image_url ? this.api_url + dish.image_url : '../../../assets/imgs/logo.png';
        dish.price = dish.price % 100 == 0 ? dish.price / 100 : (dish.price / 100).toFixed(2);
        this.dishes.push(dish);
      }
    });

    this.loading = false;
    this.cdref.detectChanges();
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
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateBack('/dish', { queryParams: 
      {
        id: id,
        name: name,
        price: price,
        image_url: image_url,
        detail: detail,
        favorite_checked: favorite_checked,
        restaurant_id: this.restaurant_id,
        back_params: this.params
      }
    });
  }

  previewPdfFile() {
    this.iab.create(this.pdf_url, '_blank');
  }

  // previewPdfFile() {
  //   var url = this.api_url + this.pdf_url;
  //   this.previewAnyFile.preview(url).then(() => {

  //   }, (err)=>{
  //     this.presentToast(JSON.stringify(err));
  //   });

  // }

  // async updateFavorite(favorite_checked, relative_id, type) {
  //   const loading = await this.loadingController.create({
  //       message: favorite_checked ? 'Removing from favorite ...' : 'Setting as favorite ...',
  //   });
  //   await loading.present();
  //   const params = {"user_id" : this.profile.id, "relative_id" : relative_id, "type" : type };
  //   let res: any = favorite_checked ? await this.restApi.removeFavorite(params) : await this.restApi.setFavorite(params);
  //   if (res.code == 200) {  // if success
  //     // update profile favorites
  //     if (favorite_checked == false) { 
  //       this.profile.favorites.push({ relative_id: relative_id, type: type});
  //     } else {
  //       let index = -1;
  //       this.profile.favorites.forEach((item, i) => {
  //         if (item.relative_id == relative_id && item.type == type) {
  //           index = i;
  //         }
  //       });
  //       this.profile.favorites.splice(index, 1);
  //     }
  //     await this.storage.set("user_profile", JSON.stringify(this.profile));
  //     // update UI
  //     if (type == 1) {
  //       this.restaurant_favorite_checked = !favorite_checked
  //     }
  //     if (type == 2) {
  //       this.dishes.forEach((dish) => {
  //         if (dish.id == relative_id) {
  //           dish.favorite_checked = !dish.favorite_checked;
  //         }
  //       });
  //     }
  //   } else { // if failed
  //     this.presentToast(res.result);
  //   }
  //   loading.dismiss();
  // }
  
}
