import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let self = this;
    setTimeout(function(){
      self.goToStartPage();
    }, 2000);
  }

  goToStartPage() {
    this.router.navigate(['/start']);
  }

}
