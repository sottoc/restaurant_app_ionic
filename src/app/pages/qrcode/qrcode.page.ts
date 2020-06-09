import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, NavController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  lang : string
  QRSCANNED_DATA: string
  api_url = environment.api_url
  restaurants : any = []
  scanSub : any
  city: any = "10"
  constructor(
    private translate: TranslateService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private qrScanner: QRScanner,
    public restApi: RestService,
    private storage: Storage,
  ) { 
    this.lang = this.translate.currentLang;
    this.getRestaurants();
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 3000
    });
    toast.present();
  }

  async getRestaurants() {
    try {
      let res: any = await this.restApi.getRestaurants(this.city);
      this.restaurants = res.data;
      this.restaurants.forEach(element => {
        element.image_url = this.api_url + element.image_url;
        element.logo_url = element.logo_url ? this.api_url + element.logo_url : '../../../assets/imgs/logo.png';
        element.favorite_checked = false;
        element.distance = 12;
        element.category_name = element.categories.length > 0 ? element.categories[0].name : '';
      });
    } catch(err) {
      console.log(err);
      this.presentToast(err.error);
    }
    this.qrScan();
  }

  qrScan() {
    document.getElementById('qrscan_title').style.visibility = "hidden";
    document.getElementById('qrcode_page').style.background = "none";
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) { // camera permission was granted
          // start scanning
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.QRSCANNED_DATA = text;
            if (this.QRSCANNED_DATA !== '') {
              this.closeScanner();
              this.scanSub.unsubscribe();
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
    this.scanSub.unsubscribe();
    this.closeScanner();
    setTimeout(() => {
      this.navCtrl.navigateBack('/home', { 
        queryParams: {}
      });
    }, 200);
  }

  findRestaurant() {
    this.scanSub = null;
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    const address_key = '54.211.162.185';
    if (this.QRSCANNED_DATA.includes(address_key) && this.QRSCANNED_DATA.split('_')[0] == address_key) {
      const restaurant_id = this.QRSCANNED_DATA.split('_')[1];
      let restaurant = this.restaurants.filter(e => e.id == restaurant_id)[0];
      console.log("qrcode_restaurant", restaurant);
      if (restaurant) {
        if (restaurant.is_open == 1) { // if restaurant is opened
            this.navCtrl.navigateBack('/restaurant', { queryParams: 
              {
                id : restaurant.id,
                image_url : restaurant.image_url,
                logo_url : restaurant.logo_url,
                name : restaurant.name,
                category_name : restaurant.name,
                favorite_checked : restaurant.favorite_checked
              }
            });
        } else { // if restaurant is closed
          this.presentToast('This restaurant is closed');
        }
      } else {
        this.presentToast('Cannot find a restaurant of id = ' + restaurant_id);
        this.qrScan();
      }
    } else {
      this.presentToast(this.QRSCANNED_DATA);
      this.qrScan();
    }
  }

}
