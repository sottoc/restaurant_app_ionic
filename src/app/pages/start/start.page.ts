import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Events, ToastController, NavController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  lang : string
  loading: any
  profile : any = {
    "id": 5,
    "email": "test@test.com",
    "username": "gus_programmer",
    "password": "e10adc3949ba59abbe56e057f20f883e",
    "city": "10",
    "name": "Gus Developer",
    "bio": "iOS/Android programmer",
    "logo_url": "/storage/user_logo/1584585087201.jpg_1584585089.jpeg",
    "country_code": "663",
    "phone_number": "564976312",
    "phone_verified": 0,
    "status": 1,
    "created_at": null,
    "updated_at": null,
    "followers": 0,
    "followings": 0,
    "favorites":[]
  }
  city : any = "10"
  constructor(
    private translate: TranslateService,
    public events: Events,
    private ref: ChangeDetectorRef,
    private navCtrl: NavController,
    public restApi: RestService,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private storage: Storage,
  ) { 
    this.lang = this.translate.currentLang;
    this.init();
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
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

  async init() {
    await this.storage.set("user_profile", JSON.stringify(this.profile));
  }

  goToRegisterPage() {

    this.navCtrl.navigateBack('/register');
  }

  goToLoginPage() {

    this.navCtrl.navigateBack('/login');
  }

  async twitterLogin() {

  }

  async register(params: any) {
    try {
      const response : any = await this.restApi.userRegister(params);
      console.log(response);
      if (response.code == 200) { // if register successfully
        this.presentToast(response.result);
        this.login({ email: params.email, password: params.password});
      } else if (response.code == 102) { // if email already exist
         this.login({ email: params.email, password: params.password});
      } else {
        this.loading.dismiss();
        this.presentToast(response.result);
      }
    } catch (err) {
      this.loading.dismiss();
      console.error("ERROR", err);
      this.presentToast(err.error);
    }
  }

  async login(params) {
    try {
        const response : any = await this.restApi.userLogin(params);
        if (response.code == 200) {
          let profile = response.data[0];
          profile.favorites = response.favorites;
          profile.followers = response.followers[0].count;
          profile.followings = response.followings[0].count;
          await this.storage.set("user_profile", JSON.stringify(profile));
          this.loading.dismiss();
          this.navCtrl.navigateBack('/loginsplash');
        } else {
          this.presentToast(response.result);
        }
    } catch (err) {
      console.error("ERROR", err)
    }
  }

  setLang(langauge) {
    this.events.publish('lang:change', langauge)
    setTimeout(function() {
      this.lang = langauge;
    }, 300);
    this.ref.detectChanges();
  }

  goToHome() {
    this.navCtrl.navigateBack("/home");
  }

  goToQRScan() {
    this.navCtrl.navigateBack("/qrcode");
  }

}
