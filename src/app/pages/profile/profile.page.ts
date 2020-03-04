import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  api_url = environment.api_url
  lang : string
  name : string
  bio : string
  city : string
  city_name: string
  logo_url : any
  constructor(
    private translate: TranslateService,
    private storage: Storage,
    public restApi: RestService,
    private ref: ChangeDetectorRef,
  ) {
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile => {
      profile = JSON.parse(profile);
      this.logo_url = profile.logo_url ? this.api_url + profile.logo_url : null;
      this.name = profile.name;
      this.bio = profile.bio;
      this.city = profile.city;
      this.city_name = profile.city_name;
      this.refresh();
    });
  }

  async ngOnInit() {
    try {
      let res: any = await this.restApi.getCities();
      let cities = res.data.filter(city => city.is_open == 1);
      let city = cities.filter(city => city.id == this.city)[0];
      this.city_name = city.name;
    } catch(err) {
      console.log(err);
    }
  }

  refresh() {
    this.ref.detectChanges();
  }

}
