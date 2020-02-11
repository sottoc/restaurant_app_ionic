import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() back_link: string;
  constructor(
    private navCtrl: NavController,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack() {
    //this.navCtrl.navigateBack(this.back_link);
    this.location.back();
  }
  

}
