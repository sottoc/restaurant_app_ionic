import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  api_url = environment.api_url;
  constructor(
    private http: HTTP,
  ) { }

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
    console.log(restaurant_id);
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
        console.log(err)
        reject(err.error);
      }
    });
  }

}
