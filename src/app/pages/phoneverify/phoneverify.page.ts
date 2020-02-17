import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, IonInput, NavController, IonNavLink } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-phoneverify',
  templateUrl: './phoneverify.page.html',
  styleUrls: ['./phoneverify.page.scss'],
})
export class PhoneverifyPage implements OnInit {
  api_url = environment.api_url
  @ViewChild('first_input', { static: false }) firstInput: IonInput;
  @ViewChild('second_input', { static: false }) secondInput: IonInput;
  @ViewChild('third_input', { static: false }) thirdInput: IonInput;
  @ViewChild('forth_input', { static: false }) forthInput: IonInput;
  cell_number : string = ""
  country_code : any
  phone_number : any
  email : any
  from_page : any
  back_link : any
  constructor(
    private toastController: ToastController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public restApi: RestService
  ) { 
    this.route.queryParams.subscribe((params: any) => {
      this.country_code = params.country_code;
      this.phone_number = params.phone_number;
      this.email = params.email;
      this.cell_number = '+' + params.country_code + ' ' + params.phone_number;
      this.from_page = params.from;
      if (this.from_page == "register_page") {
        this.back_link = "/login";
      }
      if (this.from_page == "settings_page") {
        this.back_link = "/settings";
      }
      this.verifyPhone();
    });
  }

  ngOnInit() {
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 2000
    });
    toast.present();
  }

  async verifyPhone() {
    try {
      const params = {
        country_code: this.country_code,
        phone: this.phone_number,
        via: 'sms'
      }
      let response : any = await this.restApi.verifyPhone(params);
      this.presentToast(response.result);
    } catch(err) {
      console.log(err);
      this.presentToast(err.error);
    }
  }

  changeInputFirst(e) {
    this.secondInput.setFocus();
  }

  changeInputSecond(e) {
    this.thirdInput.setFocus();
  }

  changeInputThird(e) {
    this.forthInput.setFocus();
  }

  async sendCode(form) {
    try {
      const { first_letter, second_letter, third_lettter, forth_letter } = form.control.value;
      const code = first_letter + second_letter + third_lettter + forth_letter;
      
      const params = {
        country_code: this.country_code,
        phone: this.phone_number,
        code: code,
        email: this.email
      }
      const response : any = await this.restApi.verifyCode(params);
      this.presentToast(response.result);
      if (response.code == 200) {
        if (this.from_page == 'register_page') {
          setTimeout(() => {
            this.navCtrl.navigateBack('/login');
          }, 3000);
        }
        if (this.from_page == 'settings_page') {
          setTimeout(() => {
            this.navCtrl.navigateBack('/settings');
          }, 3000);
        }
      }
    } catch (err) {
      console.error("ERROR", err);
      this.presentToast(err);
    }
  }

  
}
