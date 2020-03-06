import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';
import { NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  api_url = environment.api_url
  lang : string
  profile: any
  name : string
  bio : string
  city : string
  city_name: string
  logo_url : any
  options : any
  constructor(
    private translate: TranslateService,
    private storage: Storage,
    public restApi: RestService,
    private navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    private ref: ChangeDetectorRef,
  ) {
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile => {
      profile = JSON.parse(profile);
      this.profile = profile;
      this.logo_url = profile.logo_url ? this.api_url + profile.logo_url : null;
      this.name = profile.name;
      this.bio = profile.bio;
      this.city = profile.city;
      this.city_name = profile.city_name;
      if (this.city_name) {
        this.refresh();
      } else {
        this.getCityName();
      }
    });
  }

  ngOnInit() {    
  }

  async getCityName() {
    try {
      let res: any = await this.restApi.getCities();
      let cities = res.data.filter(city => city.is_open == 1);
      let city = cities.filter(city => city.id == this.city)[0];
      this.city_name = city.name;
      this.profile.city_name = city.name;
      await this.storage.set("user_profile", JSON.stringify(this.profile));
      this.refresh();
    } catch(err) {
      console.log(err);
    }
  }

  goToFavorite() {
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateBack('/favorite');
  }

  goToFriends() {
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateBack('/friends');
  }

  goToSettings() {
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateBack('/settings');
  }

  goToAbout() {
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateBack('/about');
  }

  goToContact() {
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.navigateBack('/contact');
  }

  goToTerms() {

  }

  refresh() {
    this.ref.detectChanges();
  }

}
