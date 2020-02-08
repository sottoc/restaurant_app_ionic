import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  lang : string
  constructor(
    private translate: TranslateService,
  ) {
    this.lang = this.translate.currentLang;
  }

  ngOnInit() {
  }

  async sendOpinion(form) {
    try {
      const { email, phone_number, opinion } = form.control.value;
      console.log(email, phone_number, opinion);

    } catch (err) {
      console.error("ERROR", err)
    }
  }

}
