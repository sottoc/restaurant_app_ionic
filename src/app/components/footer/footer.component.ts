import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() active_page: string;
  isOn = false;
  QRSCANNED_DATA: string;
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  goToHome() {
    this.active_page = "home_page";
    this.navCtrl.navigateBack("/home");
  }

  goToOffers() {
    this.active_page = "offers_page";
    this.navCtrl.navigateBack("/offers");
  }

  goToQRScan() {
    this.active_page = "qrcode";
    this.navCtrl.navigateBack("/qrcode");
  }

  goToProfile() {
    this.active_page = "profile_page";
    this.navCtrl.navigateBack("/profile");
  }

}
