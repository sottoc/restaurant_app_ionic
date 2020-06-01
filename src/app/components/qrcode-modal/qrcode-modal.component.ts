import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: ['./qrcode-modal.component.scss'],
})
export class QrcodeModalComponent implements OnInit {
  @Input() active_page: string;
  constructor(
    private navCtrl: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  goToQRScan() {
    this.active_page = "qrcode";
    this.navCtrl.navigateBack("/qrcode");
  }

  async dismiss() {
    await this.modalController.dismiss({});
  }

}
