import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';

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
  logo_url : any
  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private ref: ChangeDetectorRef,
  ) {
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile => {
      profile = JSON.parse(profile);
      this.logo_url = profile.logo_url ? this.api_url + profile.logo_url : null;
      this.name = profile.name;
      this.bio = profile.bio;
      this.city = profile.city;
      this.refresh();
    });
  }

  ngOnInit() {
  }

  refresh() {
    this.ref.detectChanges();
  }

}
