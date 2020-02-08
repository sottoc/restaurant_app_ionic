import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  lang : string
  offers : any
  constructor(
    private navCtrl: NavController,
    private translate: TranslateService
  ) { 
    this.lang = this.translate.currentLang;
    this.offers = [
      {
        offer_id: 1,
        offer_title: 'ResName',
        logo_url: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-simple-coffee-elemental-design-png-image_3597680.jpg',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/ZY-Photo-2018-09-23-00000030%20(Copy).JPG_1547864374.jpeg',
        favorite_checked: false,
        distance: 5,
        category_name: "Cate"
      },
      {
        offer_id: 2,
        offer_title: 'Name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/unnamed.jpg_1547870811.jpeg',
        favorite_checked: true,
        distance: 2,
        category_name: "Cate"
      },
      {
        offer_id: 3,
        offer_title: 'Res_name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/rst_911429.jpg_1547870543.jpeg',
        favorite_checked: true,
        distance: 23,
        category_name: "Cate"
      },
      {
        offer_id: 4,
        offer_title: 'Name',
        logo_url: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-simple-coffee-elemental-design-png-image_3597680.jpg',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
        favorite_checked: false,
        distance: 23,
        category_name: "Cate"
      },
      {
        offer_id: 5,
        offer_title: 'Name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/ZY-Photo-2018-09-23-00000030%20(Copy).JPG_1547864374.jpeg',
        favorite_checked: false,
        distance: 3,
        category_name: "Cate"
      },
      {
        offer_id: 6,
        offer_title: 'Name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/unnamed.jpg_1547870811.jpeg',
        favorite_checked: true,
        distance: 2,
        category_name: "Cate"
      },
      {
        offer_id: 7,
        offer_title: 'Name',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/rst_911429.jpg_1547870543.jpeg',
        favorite_checked: false,
        distance: 6,
        category_name: "Cate"
      },
      {
        offer_id: 8,
        offer_title: 'Price',
        logo_url: '',
        cover_img_url: 'http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/CMTHYqDUcAAa8yB.jpg_1547869818.jpeg',
        favorite_checked: false,
        distance: 9,
        category_name: "Cate"
      }
    ]
  }

  ngOnInit() {
  }

  visitOffer(offer_id) {
    console.log(offer_id);
    this.navCtrl.navigateBack('/offerdetail');
  }

}
