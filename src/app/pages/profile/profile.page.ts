import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  lang : string
  name : string = "محمد أحمد"
  bio : string = "لاعب كرة سلة و كاتب , أحب السفرعاشق الهلال"
  city : string = "المدينة المنورة"
  constructor(
    private translate: TranslateService,
  ) {
    this.lang = this.translate.currentLang;
  }

  ngOnInit() {
  }

}
