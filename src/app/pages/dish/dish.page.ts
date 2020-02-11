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
  image_url: string = "http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/items/%D9%88%D8%AC%D8%A8%D8%A9%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%20%D8%AF%D8%AC%D8%A7%D8%AC%20(Copy).jpg_1546229077.jpeg"
  dish_name: string = "dishname"
  dish_price = 79
  dish_favorite_checked: boolean = true
  dish_detail: string = "kjkjkjkjkjkfjkghghghghghghghghghghhghghhghghghghghhghghg"

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { 
    this.lang = this.translate.currentLang;
    this.route.queryParams.subscribe((params: any) => {
     console.log(params);
     this.dish_id = params.id;
     this.image_url = params.image_url;
     this.dish_name = params.name;
     this.dish_price = params.price;
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
