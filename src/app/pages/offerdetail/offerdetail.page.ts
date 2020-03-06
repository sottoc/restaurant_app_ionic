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
  offer_id : any
  lang : string
  image_url: string
  logo_url: string
  title: string
  loading: boolean = false
  api_url = environment.api_url
  restaurant_id : any
  constructor(
    private translate: TranslateService,
    public restApi: RestService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
      this.offer_id = params.id;
      this.image_url = params.image_url;
      this.logo_url = params.logo_url;
      this.title = params.title;
      this.restaurant_id = params.restaurant_id;
    });
  }

  ngOnInit() {
  }

  async getOfferDetail(id) {
    try {
      let res: any = await this.restApi.getOfferDetail(id);
      let restaurant = res.restaurant[0];
      let category = res.category[0];
      this.navCtrl.navigateBack('/restaurant', { queryParams: 
        {
          id : this.restaurant_id,
          image_url : restaurant.image_url ? this.api_url + restaurant.image_url : restaurant.image_url,
          logo_url : this.logo_url,
          name : restaurant.name,
          category_name : category.name,
          favorite_checked : true
        }
      });
    } catch(err) {
      console.log(err);
    }
  }

  goToRestaurant() {
    this.getOfferDetail(this.offer_id);
  }

}
