import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { QrcodeModalComponent } from '../qrcode-modal/qrcode-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() active_page: string;
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
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

  async openQRModal() {
    let modal = await this.modalCtrl.create({
      component: QrcodeModalComponent,
      componentProps: { },
      cssClass: 'dish-modal',
      backdropDismiss:false,
    });
    modal.onDidDismiss().then(data => {
      // let dish = data.data;
      // this.updateDish(dish.id, dish.name, dish.price, dish.image_url, dish.detail, dish.favorite_checked);
    });
    return await modal.present();
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
