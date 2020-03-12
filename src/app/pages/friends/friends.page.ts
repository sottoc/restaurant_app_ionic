import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonSearchbar, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  api_url = environment.api_url
  lang : string
  loading : boolean = false;
  friends : any = []
  friends_ids : any = []
  search_results : any = []
  profile : any
  @ViewChild('searchInput', {static: false}) searchInput: IonSearchbar;
  constructor(
    private translate: TranslateService,
    private navCtrl: NavController,
    private storage: Storage,
    public restApi: RestService,
  ) { 
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile => {
      profile = JSON.parse(profile);
      this.profile = profile;
      this.getFriends();
    });
    // this.friends = [
    //   {
    //     id: 1, name: 'hhhh', is_followed: true, city: 'المدينة المنورة',
    //     bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
    //     logo_url: '../../../assets/imgs/friend_avatar1.png'
    //   }
    // ]
  }

  ngOnInit() {
  }

  async getFriends() {
    this.loading = true;
    try {
      let res: any = await this.restApi.getFriends({user_id: this.profile.id});
      this.friends = res.data;
      this.friends.forEach(element => {
        element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/avatar.png';
        element.is_friend = true;
        this.friends_ids.push(element.id);
      });
      this.loading = false;
    } catch (err) {
      console.error("ERROR", err);
      this.loading = false;
    }
  }

  async findPeople(e) {
    const search_key = e.target.value;
    if (search_key.length < 2) {
      return;
    }
    this.loading = true;
    if (search_key != "") {
      try {
        let res: any = await this.restApi.searchPeople({user_id: this.profile.id, key: search_key});
        this.friends = res.data;
        this.friends.forEach(element => {
          element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/avatar.png';
          element.is_friend = this.friends_ids.includes(element.id) ? true : false;
        });
        this.loading = false;
      } catch (err) {
        console.error("ERROR", err);
        this.loading = false;
      }
    } else {
      this.getFriends();
    }
    
  }

  visit(friend_id) {
    const person = this.friends.filter(item => item.id == friend_id)[0];
    this.navCtrl.navigateBack('/friend', { queryParams: 
      { 
        logged_id: this.profile.id,
        user_id: friend_id,
        name: person.name,
        city: person.city_name,
        bio: person.bio,
        is_friend: person.is_friend, 
        logo_url : person.logo_url
      }
    });
  }

}
