import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  api_url = environment.api_url;
  constructor(
    private http: HTTP,
    private toastController: ToastController,
  ) { }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 2000
    });
    toast.present();
  }

  userLogin(params) {
    const url = `${this.api_url}/api/login`;
    return this.handleRequest(1, url, params);
  }

  userRegister(params) {
    const url = `${this.api_url}/api/register`;
    return this.handleRequest(1, url, params);
  }

  verifyPhone(params) {
    const url = `${this.api_url}/api/verify`;
    return this.handleRequest(1, url, params);
  }

  verifyCode(params) {
    const url = `${this.api_url}/api/verify-code`;
    return this.handleRequest(1, url, params);
  }

  updateProfile(params) {
    const url = `${this.api_url}/api/update_profile`;
    return this.handleRequest(1, url, params);
  }

  uploadLogo(params) {
    const url = `${this.api_url}/api/upload_logo`;
    return this.handleRequest(1, url, params);
  }

  getRestaurants() {
    const url = `${this.api_url}/api/restaurants`;
    return this.handleRequest(0, url, {});
  }

  getCategories() {
    const url = `${this.api_url}/api/categories`;
    return this.handleRequest(0, url, {});
  }

  getRestaurantsByKey(key) {
    const url = `${this.api_url}/api/restaurants?restaurant_name=${key}`;
    return this.handleRequest(0, url, {});
  }

  getMenusAll() {
    const url = `${this.api_url}/api/menus`;
    return this.handleRequest(0, url, {});
  }

  getMenus(restaurant_id) {
    const url = `${this.api_url}/api/menus?restaurant=${restaurant_id}`;
    return this.handleRequest(0, url, {});
  }

  handleRequest(method, url, params) {
    return new Promise(async (resolve, reject) => {
      try {
        this.http.setDataSerializer('json');
        let promise = null; 
        switch (method) {
          case 0:
            promise = this.http.get(url, params, {});
            break;
          case 1:
            promise = this.http.post(url, params, {});
            break;
          case 2:
            promise = this.http.put(url, params, {});
            break;
          case 3:
            promise = this.http.delete(url, params, {});
            break;
        }

        let res: any = await Promise.resolve(promise);
        try {
          res = JSON.parse(res.data);
        } catch (err) {
          res = res.data;
        }
        console.log('response', res)
        resolve(res);
      } catch (err) {
        console.log(err);
        this.presentToast(err.error);
        reject(err.error);
      }
    });
  }
}
