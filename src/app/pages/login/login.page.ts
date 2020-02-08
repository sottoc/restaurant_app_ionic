import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, IonInput } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  lang : string
  @ViewChild('email_input', { static: false }) emailInput: IonInput;
  constructor(
    private navCtrl: NavController,
    private translate: TranslateService,
    private toastController: ToastController,
  ) { 
    this.lang = this.translate.currentLang;
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 2000
    });
    toast.present();
  }

  async login(form) {
    try {
      const { email, password } = form.control.value;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var valid_state = re.test(String(email).toLowerCase());
      if (valid_state == false) {
        this.presentToast('Invalid email address');
        this.emailInput.setFocus();
      } else {
        console.log(email, password);
        this.navCtrl.navigateBack('/loginsplash');
      }
    } catch (err) {
      console.error("ERROR", err)
    }
  }

}
