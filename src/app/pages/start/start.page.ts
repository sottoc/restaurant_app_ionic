import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  lang : string
  constructor(
    private translate: TranslateService,
    public events: Events
  ) { 
    this.lang = this.translate.currentLang;
  }

  ngOnInit() {
  }

  setLang(langauge) {
    this.events.publish('lang:change', langauge)
    setTimeout(function() {
      this.lang = langauge;
    }, 300);
  }

}
