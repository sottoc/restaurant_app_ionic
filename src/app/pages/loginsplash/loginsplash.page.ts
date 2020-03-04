import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-loginsplash',
  templateUrl: './loginsplash.page.html',
  styleUrls: ['./loginsplash.page.scss'],
})
export class LoginsplashPage implements OnInit {

  loading: boolean = false
  user_id : any
  cities : any = []
  city : any
  profile : any
  constructor(
    private router: Router,
    public restApi: RestService,
    private storage: Storage,
    private toastController: ToastController,
  ) { 
    this.storage.get('user_profile').then(profile =>{
      profile = JSON.parse(profile);
      this.profile = profile;
      this.user_id = profile.id;
      this.city = parseInt(profile.city) ? parseInt(profile.city) : null;
      if (!this.city) {
        this.getCities();
      } else {
        this.getCategories();
      }
    });
    
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 3000
    });
    toast.present();
  }

  async getCities() {
    try {
      let res: any = await this.restApi.getCities();
      this.cities = res.data.filter(city => city.is_open == 1);
    } catch(err) {
      console.log(err);
    }
  }

  async changeCity(e) {
    if (!e.target.value) {
      return;
    }
    let response : any;
    response = await this.restApi.updateProfile({
      id: this.user_id,
      field: "city",
      value: e.target.value
    });
    if (response.code == 200) {
      this.city = e.target.value;
      this.profile.city = this.city;
      await this.storage.set("user_profile", JSON.stringify(this.profile));
    } else {
      this.presentToast(response.result);
    }
    if (this.city) {
      this.getCategories();
    }
  }

  async getCategories() {
    try {
      this.loading = true;
      let res: any = await this.restApi.getCategories(this.city);
      let categories = res.data;
      categories.forEach(element => {
        element.isChecked = true;
      });
      await this.storage.set("categories", JSON.stringify(categories));
      let self = this;
      setTimeout(function(){
        self.router.navigate(['/home']);
      }, 1000);
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }

}
