import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() back_link: string;
  @Input() params: string;
  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  goBack() {
    if (this.back_link == '/start') {
      this.navCtrl.navigateBack('/home');
    } else if (this.back_link == '/home' && this.params == 'favorite') {
      this.navCtrl.navigateBack('/favorite');
    } else if (this.back_link == '/restaurant' && JSON.parse(this.params) == null) {
      this.navCtrl.navigateBack('/favorite');
    } else {
      let queryParams = this.params ? JSON.parse(this.params) : {};
      this.navCtrl.navigateBack(this.back_link, {
        queryParams: queryParams
      });
    }
  }
}
