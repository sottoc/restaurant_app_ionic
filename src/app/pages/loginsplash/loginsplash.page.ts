import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-loginsplash',
  templateUrl: './loginsplash.page.html',
  styleUrls: ['./loginsplash.page.scss'],
})
export class LoginsplashPage implements OnInit {

  loading: boolean = false
  constructor(
    private router: Router,
    public restApi: RestService,
    private storage: Storage,
  ) { 
    this.getCategories();
  }

  ngOnInit() {
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
