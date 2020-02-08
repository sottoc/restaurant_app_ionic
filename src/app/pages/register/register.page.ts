import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInput, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  lang : string
  @ViewChild('email_input', { static: false }) emailInput: IonInput;
  @ViewChild('username_input', { static: false }) usernameInput: IonInput;
  @ViewChild('password_input', { static: false }) passwordInput: IonInput;
  @ViewChild('confirm_password_input', { static: false }) confirmPasswordInput: IonInput;
  @ViewChild('phone_number_input', { static: false }) phoneNumberInput: IonInput;
  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private translate: TranslateService,
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

  emailInputBlur(e) {
    var email = e.target.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid_state = re.test(String(email).toLowerCase());
    if (valid_state == false) {
      this.presentToast('Please write valid email address.');
      this.emailInput.setFocus();
    } else {
      // check if already exist of this email by using API
    }
  }

  passwordInputBlur(e) {
    var password = e.target.value;
    if (password.length < 6) {
      this.presentToast('Password length should be more than 6.');
      this.passwordInput.setFocus();
    }
  }

  confirmPasswordInputBlur(e) {
    var confirm_password = e.target.value;
    if (confirm_password != this.passwordInput.value) {
      this.presentToast('Confirm password not matched.');
      this.confirmPasswordInput.value = "";
      this.confirmPasswordInput.setFocus();
    }
  }

  changeCountryCode(e) {
    var country_code = e.target.value;
    if (country_code.length == 3) {
      this.phoneNumberInput.setFocus();
    }
  }

  async register(form) {
    try {
      const { email, username, password, confirm_password, city, country_code, phone_number } = form.control.value;
      console.log(email, username, password, confirm_password, city, country_code, phone_number);

      const cell_number = '+' + country_code + ' ' + phone_number;
      this.navCtrl.navigateBack('/phoneverify', { queryParams: 
        {cell_number: cell_number}
      });
    } catch (err) {
      console.error("ERROR", err);
      this.presentToast(err);
    }
  }

}
