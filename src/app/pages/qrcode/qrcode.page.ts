import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Location } from "@angular/common";

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  QRSCANNED_DATA: string;
  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private qrScanner: QRScanner,
    private location: Location
  ) { }

  ngOnInit() {
    this.qrScan();
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 5000
    });
    toast.present();
  }

  qrScan() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) { // camera permission was granted
          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.QRSCANNED_DATA = text;
            if (this.QRSCANNED_DATA !== '') {
              this.closeScanner();
              scanSub.unsubscribe();
              this.findRestaurant();
            }
          });

          this.qrScanner.resumePreview();
          // show camera preview
          this.qrScanner.show();

        } else if (status.denied) {
          console.log('camera permission denied');
          this.qrScanner.openSettings();
        } else {
          
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  closeScanner() {
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  cancelScan() {
    this.closeScanner();
    this.location.back();
  }

  findRestaurant() {
    const address_key = '54.211.162.185';
    if (this.QRSCANNED_DATA.includes(address_key) && this.QRSCANNED_DATA.split('_')[0] == address_key) {
      const restaurant_id = this.QRSCANNED_DATA.split('_')[1];
      this.navCtrl.navigateBack('/restaurant', { queryParams: 
        { restaurant_id: restaurant_id }
      });
    } else {
      this.presentToast(this.QRSCANNED_DATA);
    }
  }

}
