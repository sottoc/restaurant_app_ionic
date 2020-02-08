import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, IonInput } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phoneverify',
  templateUrl: './phoneverify.page.html',
  styleUrls: ['./phoneverify.page.scss'],
})
export class PhoneverifyPage implements OnInit {

  @ViewChild('first_input', { static: false }) firstInput: IonInput;
  @ViewChild('second_input', { static: false }) secondInput: IonInput;
  @ViewChild('third_input', { static: false }) thirdInput: IonInput;
  @ViewChild('forth_input', { static: false }) forthInput: IonInput;
  cell_number : string = ""
  constructor(
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParams.subscribe((params: any) => {
      this.cell_number = params.cell_number;
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
      console.log(code);

      //this.navCtrl.navigateBack('/phoneverify');
    } catch (err) {
      console.error("ERROR", err);
      this.presentToast(err);
    }
  }

}
