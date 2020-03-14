import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  lang : string
  api_url = environment.api_url
  profile : any
  constructor(
    private translate: TranslateService,
    private callNumber: CallNumber,
    private toastController: ToastController,
    public restApi: RestService,
    private storage: Storage,
  ) {
    this.lang = this.translate.currentLang;
    this.storage.get('user_profile').then(profile => {
      profile = JSON.parse(profile);
      this.profile = profile;
    });
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 2000
    });
    toast.present();
  }

  async sendOpinion(form) {
    try {
      const { email, phone_number, message } = form.control.value;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var valid_state = re.test(String(email).toLowerCase());
      if (valid_state == false) {
        this.presentToast('Invalid email address');
      } else if (phone_number.length < 9) {
        this.presentToast('Invalid phone number');
      } else {
        const params = {
          user_id: this.profile.id,
          email: email,
          phone_number: String(phone_number),
          message: message
        }
        const res : any = await this.restApi.postContact(params);
        if (res.code == 200) {
          this.presentToast(String(res.result) == '1' ? 'Updated successfully' : 'Posted successfully');
        } else {
          this.presentToast('Failed');
        }
      }
    } catch (err) {
      console.error("ERROR", err)
    }
  }

  callNow() {
    this.callNumber.callNumber("0570786888", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
