import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  lang : string
  offers : any = []
  loading: boolean = false
  api_url = environment.api_url
  constructor(
    private navCtrl: NavController,
    public restApi: RestService,
    private nativePageTransitions: NativePageTransitions,
    private translate: TranslateService
  ) { 
    this.lang = this.translate.currentLang;
    this.getOffers();
  }

  ngOnInit() {
  }

  async getOffers() {
    try {
      this.loading = true;
      let res: any = await this.restApi.getOffers();
      this.offers = res.data;
      this.offers.forEach(element => {
        element.image_url = this.api_url + element.image_url;
        element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/logo-black.png';
      });
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }

  visitOffer(offer_id) {
    let options : NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    let offer = this.offers.filter(offer => offer.id == offer_id)[0];
    this.navCtrl.navigateBack('/offerdetail', { queryParams: 
      {
        id : offer_id,
        image_url : offer.image_url,
        logo_url : offer.logo_url,
        title: offer.title,
        restaurant_id : offer.restaurant_id
      }
    });
  }

}
