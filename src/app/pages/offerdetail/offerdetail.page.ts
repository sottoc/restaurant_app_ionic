import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offerdetail',
  templateUrl: './offerdetail.page.html',
  styleUrls: ['./offerdetail.page.scss'],
})
export class OfferdetailPage implements OnInit {
  lang : string
  image_url: string
  logo_url: string
  title: string
  loading: boolean = false
  api_url = environment.api_url
  restaurant_id : any
  restaurant : any
  category : any
  constructor(
    private translate: TranslateService,
    public restApi: RestService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
      this.getOfferDetail(params.id)
    });
  }

  ngOnInit() {
  }

  async getOfferDetail(id) {
    try {
      this.loading = true;
      let res: any = await this.restApi.getOfferDetail(id);
      let data = res.data[0];
      this.restaurant = res.restaurant[0];
      this.category = res.category[0];
      this.image_url = this.api_url + data.image_url;
      this.logo_url = this.restaurant.logo_url ? this.api_url + this.restaurant.logo_url : '../../../assets/imgs/logo-black.png';
      this.title = data.title;
      this.restaurant_id = data.restaurant_id;
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }

  goToRestaurant() {
    this.navCtrl.navigateBack('/restaurant', { queryParams: 
      {
        id : this.restaurant_id,
        image_url : this.restaurant.image_url ? this.api_url + this.restaurant.image_url : this.restaurant.image_url,
        logo_url : this.logo_url,
        name : this.restaurant.name,
        category_name : this.category.name,
        favorite_checked : true
      }
    });
  }

}
