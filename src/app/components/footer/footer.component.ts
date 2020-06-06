import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // @Input() active_page: string;
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  goToHome() {
    this.navCtrl.navigateBack("/home");
  }

  goToOffers() {
    this.navCtrl.navigateBack("/offers");
  }

  goToQRScan() {
    this.navCtrl.navigateBack("/qrcode");
  }

  goToProfile() {
    this.navCtrl.navigateBack("/profile");
  }

}
