import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, IonSearchbar, NavController } from '@ionic/angular';
import { FilterModalComponent } from '../../components/filter-modal/filter-modal.component';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  lang : string
  api_url = environment.api_url
  restaurants : any = []
  display_grid_state : boolean = true
  loading: boolean = false
  @ViewChild('searchInput', {static: false}) searchInput: IonSearchbar;
  constructor(
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public restApi: RestService
  ) {
    this.lang = this.translate.currentLang;
    this.getRestaurants();
    // this.restaurants = [
    //   {
    //     id: 1,
    //     name: 'ResName',
    //     logo_url: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-simple-coffee-elemental-design-png-image_3597680.jpg',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/ZY-Photo-2018-09-23-00000030%20(Copy).JPG_1547864374.jpeg',
    //     favorite_checked: false,
    //     distance: 5,
    //     category_name: "Cate"
    //   },
    //   {
    //     id: 2,
    //     name: 'Name',
    //     logo_url: '../../../assets/imgs/logo-black.png',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/unnamed.jpg_1547870811.jpeg',
    //     favorite_checked: true,
    //     distance: 2,
    //     category_name: "Cate"
    //   },
    //   {
    //     id: 3,
    //     name: 'Res_name',
    //     logo_url: '../../../assets/imgs/logo-black.png',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/rst_911429.jpg_1547870543.jpeg',
    //     favorite_checked: true,
    //     distance: 23,
    //     category_name: "Cate"
    //   },
    //   {
    //     id: 4,
    //     name: 'Name',
    //     logo_url: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-simple-coffee-elemental-design-png-image_3597680.jpg',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
    //     favorite_checked: false,
    //     distance: 23,
    //     category_name: "Cate"
    //   },
    //   {
    //     id: 5,
    //     name: 'Name',
    //     logo_url: '',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/ZY-Photo-2018-09-23-00000030%20(Copy).JPG_1547864374.jpeg',
    //     favorite_checked: false,
    //     distance: 3,
    //     category_name: "Cate"
    //   },
    //   {
    //     id: 6,
    //     name: 'Name',
    //     logo_url: '',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/unnamed.jpg_1547870811.jpeg',
    //     favorite_checked: true,
    //     distance: 2,
    //     category_name: "Cate"
    //   },
    //   {
    //     id: 7,
    //     name: 'Name',
    //     logo_url: '',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/rst_911429.jpg_1547870543.jpeg',
    //     favorite_checked: false,
    //     distance: 6,
    //     category_name: "Cate"
    //   },
    //   {
    //     id: 8,
    //     name: 'Price',
    //     logo_url: '',
    //     image_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
    //     favorite_checked: false,
    //     distance: 9,
    //     category_name: "Cate"
    //   }
    // ]
  }

  ngOnInit() {
  }

  async getRestaurants() {
    try {
      this.loading = true;
      let res: any = await this.restApi.getRestaurants();
      this.restaurants = res.data;
      this.restaurants.forEach(element => {
        element.image_url = this.api_url + element.image_url;
        element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/logo-black.png';
        element.favorite_checked = false;
        element.distance = 12,
        element.category_name = element.categories.length > 0 ? element.categories[0].name : '';
      });
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }

  visitRestaurant(id) {
    this.navCtrl.navigateBack('/restaurant', { queryParams: 
      {restaurant_id: id}
    });
  }

  setFavorite(id) {
    this.restaurants.forEach(e => {
      if (e.id == id) {
        e.favorite_checked = !e.favorite_checked;
      }
    });
  }

  async showFilterModal() {
    const modal = await this.modalCtrl.create({
      component: FilterModalComponent,
      cssClass: 'filter-modal',
    });
    return await modal.present();
  }

  showList() {
    this.display_grid_state = false;
  }

  showGrid() {
    this.display_grid_state = true;
  }

}
