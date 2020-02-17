import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInput, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../../services/rest.service';

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
    public restApi: RestService,
  ) { 
    this.lang = this.translate.currentLang;
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

      const params = {
        email: email,
        username: username,
        password: password,
        city: city,
        country_code: country_code,
        phone_number: phone_number
      }
      const response : any = await this.restApi.userRegister(params);
      if (response.code == 200) {
        this.presentToast(response.result);
        setTimeout(() => {
          this.navCtrl.navigateBack('/phoneverify', { queryParams: 
            {
              email: email,
              country_code: country_code.toString(),
              phone_number: phone_number.toString(),
              from: 'register_page'
            }
          });
        }, 2000);
      } else {
        this.presentToast(response.result);
      }

    } catch (err) {
      console.error("ERROR", err);
      this.presentToast(err.error);
    }
  }

}
