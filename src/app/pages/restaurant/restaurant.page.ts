import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonSlides, NavController } from '@ionic/angular';

const Item_Height = 139;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  lang : string
  cover_img_url: string = "http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/unnamed.jpg_1547870811.jpeg"
  logo_url: string = "http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg"
  restaurant_favorite_checked: boolean = true
  restaurant_name: string = 'kkkkkk'
  restaurant_cate: string = 'cate'
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    speed: 400
  };
  menus : any = []
  selected_menu_id = 0
  dishes : any = []
  @ViewChild('dish_content', { static: false }) dish_content: IonContent;
  @ViewChild('menu_slides', { static: false }) menu_slides: IonSlides;
  clicked_menu_status : boolean = false
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
     console.log(params);
    });
    this.menus = [
      { menu_id: 1, menu_name: 'menu1'},
      { menu_id: 2, menu_name: 'menu2'},
      { menu_id: 3, menu_name: 'menu3'},
      { menu_id: 4, menu_name: 'menu4'},
      { menu_id: 5, menu_name: 'menu5'},
      { menu_id: 6, menu_name: 'menu6'},
      { menu_id: 7, menu_name: 'menu7'},
      { menu_id: 8, menu_name: 'menu8'},
    ];
    this.selected_menu_id = this.menus[0].menu_id;
    this.dishes = [
      { dish_id: 1, menu_id: 1, dish_name: 'dish1', price:'12', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 2, menu_id: 1, dish_name: 'dish2', price:'12', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 3, menu_id: 1, dish_name: 'dish3', price:'13', favorite_checked: false, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 4, menu_id: 1, dish_name: 'dish4', price:'13', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 5, menu_id: 2, dish_name: 'dish5', price:'13', favorite_checked: false, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 6, menu_id: 2, dish_name: 'dish6', price:'5', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 7, menu_id: 2, dish_name: 'dish7', price:'6', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 8, menu_id: 3, dish_name: 'dish8', price:'13', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 9, menu_id: 3, dish_name: 'dish9', price:'13', favorite_checked: false, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 10, menu_id: 3, dish_name: 'dish10', price:'17', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 11, menu_id: 3, dish_name: 'dish11', price:'13', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 12, menu_id: 3, dish_name: 'dish12', price:'13', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 13, menu_id: 3, dish_name: 'dish13', price:'13', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 14, menu_id: 4, dish_name: 'dish14', price:'13', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 15, menu_id: 4, dish_name: 'dish15', price:'13', favorite_checked: false, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 16, menu_id: 5, dish_name: 'dish16', price:'131', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 17, menu_id: 5, dish_name: 'dish17', price:'18', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 18, menu_id: 5, dish_name: 'dish18', price:'33', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 19, menu_id: 5, dish_name: 'dish19', price:'53', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 20, menu_id: 5, dish_name: 'dish20', price:'14', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 21, menu_id: 6, dish_name: 'dish21', price:'19', favorite_checked: false, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 22, menu_id: 6, dish_name: 'dish22', price:'63', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 23, menu_id: 7, dish_name: 'dish23', price:'23', favorite_checked: false, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 24, menu_id: 7, dish_name: 'dish24', price:'83', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 25, menu_id: 7, dish_name: 'dish25', price:'93', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},
      { dish_id: 26, menu_id: 7, dish_name: 'dish26', price:'113', favorite_checked: true, dish_image: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D9%84%D8%AD%D9%85%20(Copy).jpg_1546229092.jpeg'},

    ]
  }
  

  ngOnInit() {
  }

  setFavorite() {
    this.restaurant_favorite_checked = !this.restaurant_favorite_checked;
  }

  setFavoriteDish(dish_id) {
    for(var i = 0; i<this.dishes.length; i++) {
      this.dishes[i]
    }
    this.dishes.forEach((element) => {
      if (element.dish_id == dish_id) {
        element.favorite_checked = !element.favorite_checked;
      }
    });
  }  

  visitDish(dish_id) {
    this.navCtrl.navigateBack('/dish', { queryParams: 
      {dish_id: dish_id}
    });
  }

  selectMenu(menu_id) {
    this.clicked_menu_status = true;
    this.selected_menu_id = menu_id;
    let dishes = this.dishes.filter(e => e.menu_id == menu_id);
    if (dishes && dishes.length) {
      var dish_id = dishes[0].dish_id;
      let len = this.dishes.filter(e => e.dish_id < dish_id).length;
      let x = 0, y = Math.floor(len/2) * Item_Height, duration = 500;
      this.dish_content.scrollToPoint(x, y, duration);
    }
  }

  scrollDishes(e) {
    if (!this.clicked_menu_status) {
      let len = Math.floor(e.detail.currentY / Item_Height) * 2;
      if (this.dishes[len]) {
        let menu_id = this.dishes[len].menu_id;
        this.menus.forEach((m, index) => {
          if (m.menu_id == menu_id) {
            this.menu_slides.slideTo(index, 500);
          }
        });
        this.selected_menu_id = menu_id;
      }
    }
  }

  scrollDishesEnd() {
    this.clicked_menu_status = false;
  }

}
