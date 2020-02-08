import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-offerdetail',
  templateUrl: './offerdetail.page.html',
  styleUrls: ['./offerdetail.page.scss'],
})
export class OfferdetailPage implements OnInit {
  lang : string
  cover_img_url: string = "http://ec2-54-211-162-185.compute-1.amazonaws.com:8000/storage/restaurants/unnamed.jpg_1547870811.jpeg"
  logo_url: string = "https://png.pngtree.com/png-clipart/20190515/original/pngtree-simple-coffee-elemental-design-png-image_3597680.jpg"
  offer_title: string = "50% discount on shawarma meals"
  constructor(
    private translate: TranslateService
  ) { 
    this.lang = this.translate.currentLang;
  }

  ngOnInit() {
  }

}
