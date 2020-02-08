import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginsplash',
  templateUrl: './loginsplash.page.html',
  styleUrls: ['./loginsplash.page.scss'],
})
export class LoginsplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let self = this;
    setTimeout(function(){
      self.goToHomePage();
    }, 1000);
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

}
