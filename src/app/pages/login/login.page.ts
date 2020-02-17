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
  @ViewChild('email_input', { static: false }) emailInput: IonInput;
  constructor(
    private navCtrl: NavController,
    private translate: TranslateService,
    private toastController: ToastController,
    public restApi: RestService,
    private storage: Storage,
  ) { 
    this.lang = this.translate.currentLang;
    this.getCategories();
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

  async login(form) {
    try {
      const { email, password } = form.control.value;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var valid_state = re.test(String(email).toLowerCase());
      if (valid_state == false) {
        this.presentToast('Invalid email address');
        this.emailInput.setFocus();
      } else {
        const response : any = await this.restApi.userLogin({ email: email, password: password});
        if (response.code == 200) {
          await this.storage.set("user_profile", JSON.stringify(response.data[0]));
          this.navCtrl.navigateBack('/loginsplash');
        } else {
          this.presentToast(response.result);
        }
      }
    } catch (err) {
      console.error("ERROR", err)
    }
  }

  async getCategories() {
    try {
      this.loading = true;
      let res: any = await this.restApi.getCategories();
      let categories = res.data;
      categories.forEach(element => {
        element.isChecked = true;
      });
      await this.storage.set("categories", JSON.stringify(categories));
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }
  

}
