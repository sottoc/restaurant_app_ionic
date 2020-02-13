import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  lang : string
  dish_id: any
  image_url: string
  dish_name: string
  dish_price: any
  dish_favorite_checked: boolean = true
  dish_detail: string 
  params : any = {}
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
     this.params = JSON.stringify(params.back_params);
     this.dish_id = params.id;
     this.image_url = params.image_url;
     this.dish_name = params.name;
     this.dish_price = params.price;
     this.dish_detail = params.detail;
     this.dish_favorite_checked = params.favorite_checked;
    });
  }

  ngOnInit() {
  }

  async sendOpinion(form) {
    try {
      const { opinion } = form.control.value;
      console.log(opinion);

    } catch (err) {
      console.error("ERROR", err)
    }
  }

  setFavoriteDish() {
    this.dish_favorite_checked = !this.dish_favorite_checked;
  }

}
