import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, IonInput } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  api_url = environment.api_url
  lang : string
  loading: boolean = false
  remebered: boolean = false
  @ViewChild('email_input', { static: false }) emailInput: IonInput;
  @ViewChild('password_input', { static: false }) passwordInput: IonInput;
  constructor(
    private navCtrl: NavController,
    private translate: TranslateService,
    private toastController: ToastController,
    public restApi: RestService,
    private storage: Storage,
  ) { 
    this.lang = this.translate.currentLang;
    this.storage.get('remember_me').then(value =>{
      this.remebered = value == "true" ? true : false;
      this.remebered ? this.getLoginInfo() : null;
    });
  }

  ngOnInit() {
  }

  getLoginInfo() {
    this.storage.get('login_info').then(data =>{
      if (data) {
        data = JSON.parse(data);
        this.emailInput.value = data.email;
        this.passwordInput.value = data.password;
      }
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 2000
    });
    toast.present();
  }

  async rememberMe(e) {
    if (e.target.checked) {
      this.remebered = true;
      await this.storage.set("remember_me", "true");
    } else {
      this.remebered = false;
      await this.storage.set("remember_me", "false");
    }
  }

  async login(form) {
    try {
      this.loading = true;
      const { email, password } = form.control.value;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var valid_state = re.test(String(email).toLowerCase());
      if (valid_state == false) {
        this.presentToast('Invalid email address');
        this.emailInput.setFocus();
      } else {
        const response : any = await this.restApi.userLogin({ email: email, password: password});
        if (response.code == 200) {
          let profile = response.data[0];
          profile.favorites = response.favorites;
          await this.storage.set("user_profile", JSON.stringify(profile));
          if (this.remebered == true) {
            await this.storage.set("login_info", JSON.stringify({ email: email, password: password}));
          }
          this.navCtrl.navigateBack('/loginsplash');
        } else {
          this.presentToast(response.result);
          this.getLoginInfo();
        }
        this.loading = false;
      }
    } catch (err) {
      this.loading = false;
      this.getLoginInfo();
      console.error("ERROR", err)
    }
  }

}
