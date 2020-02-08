import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonSearchbar, NavController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  lang : string
  friends : any = []
  search_results : any = []
  @ViewChild('searchInput', {static: false}) searchInput: IonSearchbar;
  constructor(
    private translate: TranslateService,
    private navCtrl: NavController,
  ) { 
    this.lang = this.translate.currentLang;
    this.friends = [
      {
        id: 1, name: 'hhhh', is_followed: true, city: 'المدينة المنورة',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar1.png'
      },
      {
        id: 2, name: 'محمد أحمد', is_followed: true, city: 'المدينة المنورة',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar2.png'
      },
      {
        id: 3, name: 'محمد أحمد', is_followed: true, city: 'المدينة المنورة',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar1.png'
      },
      {
        id: 4, name: 'محمد أحمد', is_followed: true, city: 'المدينة المنورة',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar2.png'
      },
      {
        id: 5, name: 'wwwwww', is_followed: true, city: 'aaaaaa',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar1.png'
      },
      {
        id: 6, name: 'hhhh', is_followed: true, city: 'kkk',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar2.png'
      },
      {
        id: 7, name: 'محمد أحمد', is_followed: true, city: 'uuu',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar1.png'
      },
      {
        id: 8, name: 'kkkk', is_followed: true, city: 'ppp',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar2.png'
      },
      {
        id: 9, name: 'pppp', is_followed: true, city: 'wwww',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar1.png'
      },
      {
        id: 10, name: 'wwwwww', is_followed: true, city: 'aaaaaa',
        bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
        logo_url: '../../../assets/imgs/friend_avatar2.png'
      }
    ]
  }

  ngOnInit() {
  }

  findPeople(e) {
    const search_key = e.target.value;
    console.log(search_key);
    if (search_key != "") {
      this.friends = [
        {
          id: 12, name: 'hhhh', is_followed: false, city: 'kkk',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar3.png'
        },
        {
          id: 2, name: 'hh2', is_followed: true, city: 'uuu',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar2.png'
        },
        {
          id: 3, name: 'hhh678', is_followed: true, city: 'ppp',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar1.png'
        }
      ]
    } else {
      this.friends = [
        {
          id: 1, name: 'hhhh', is_followed: true, city: 'المدينة المنورة',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar1.png'
        },
        {
          id: 2, name: 'محمد أحمد', is_followed: true, city: 'المدينة المنورة',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar2.png'
        },
        {
          id: 3, name: 'محمد أحمد', is_followed: true, city: 'المدينة المنورة',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar1.png'
        },
        {
          id: 4, name: 'محمد أحمد', is_followed: true, city: 'المدينة المنورة',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar2.png'
        },
        {
          id: 5, name: 'wwwwww', is_followed: true, city: 'aaaaaa',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar1.png'
        },
        {
          id: 6, name: 'hhhh', is_followed: true, city: 'kkk',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar2.png'
        },
        {
          id: 7, name: 'محمد أحمد', is_followed: true, city: 'uuu',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar1.png'
        },
        {
          id: 8, name: 'kkkk', is_followed: true, city: 'ppp',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar2.png'
        },
        {
          id: 9, name: 'pppp', is_followed: true, city: 'wwww',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar1.png'
        },
        {
          id: 10, name: 'wwwwww', is_followed: true, city: 'aaaaaa',
          bio: "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال",
          logo_url: '../../../assets/imgs/friend_avatar2.png'
        }
      ]
    }
    
  }

  visit(id, is_followed, logo_url) {
    console.log(id, is_followed);
    this.navCtrl.navigateBack('/friend', { queryParams: 
      { user_id: id, is_followed: is_followed, logo_url : logo_url}
    });
  }

}
