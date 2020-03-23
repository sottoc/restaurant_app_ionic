import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {
  lang : string
  api_url = environment.api_url
  loading : boolean = false
  logged_id : any
  name : string
  bio : string
  city : string
  user_id : any
  is_followed : boolean = false
  logo_url : string
  favorite_restaurants : any = []
  favorite_dishes : any = []
  selected_dishes : boolean = false
  followers = 0
  followings = 0
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    public restApi: RestService,
    private loadingController: LoadingController,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
      this.logged_id = params.logged_id;
      this.user_id = params.user_id;
      this.name = params.name;
      this.city = params.city;
      this.bio = params.bio;
      this.is_followed = params.is_friend;
      this.logo_url = params.logo_url;
      this.getFollows();
      this.is_followed ? this.getFavorites(1) : null;
    });
  }

  ngOnInit() {
  }

  async getFollows() {
    try {
      let res: any = await this.restApi.getFollows(this.user_id);
      this.followers = res.followers[0].count;
      this.followings = res.followings[0].count;
    } catch(err) {
      console.log(err);
    }
  }

  async makeFriend() {
    const loading = await this.loadingController.create({
        message: 'Following...',
    });
    await loading.present();
    let res: any = await this.restApi.addFriend({
      user_id: this.logged_id,
      friend_id: this.user_id
    });
    if (res.code == 200) {
      this.is_followed = true;
      this.getFavorites(1);
    }
    loading.dismiss();
  }

  async getFavorites(type) {
    try {
      this.loading = true;
      let res: any = await this.restApi.getFavorites(this.user_id, type);
      let favorites_data = res.data;
      favorites_data.forEach(element => {
        if (type == 1) {
          element.image_url = element.image_url ? this.api_url + element.image_url : '../../../assets/imgs/empty.png';
          element.category_name = element.category_name ? element.category_name : '';
        } else {
          element.image_url = element.image_url ? this.api_url + element.image_url : '../../../assets/imgs/logo-black.png';
          element.price = element.price % 100 == 0 ? element.price / 100 : (element.price / 100).toFixed(2);
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
    if (field == 'dish') {
      this.selected_dishes = true;
      this.getFavorites(2);
    } else {
      this.selected_dishes = false;
      this.getFavorites(1);
    }
  }

}
