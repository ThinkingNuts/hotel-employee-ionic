import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Slides, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("homeslides") slides: Slides;
  private banners = [
    {
      title: "1111111",
      imgSrc: "assets/img/1.jpg"
    }, {
      title: "2222222",
      imgSrc: "assets/img/2.jpg"
    }, {
      title: "33333333",
      imgSrc: "assets/img/3.gif"
    }, {
      title: "44444444",
      imgSrc: "assets/img/4.jpg"
    }
  ];

  constructor(
    private navCtrl: NavController
  ) { }

  //解决切换其他页面回去轮播图不动问题
  // ionViewWillEnter() {
  //   console.log("------------------>>>>>>>>>>>>> HomePage ionViewWillEnter");
  //   if (this.slides) {
  //     this.slides.startAutoplay();
  //   }
  // }
  // ionViewWillLeave() {
  //   console.log("------------------>>>>>>>>>>>>> HomePage ionViewWillLeave");
  //   if (this.slides) {
  //     this.slides.stopAutoplay();
  //   }
  // }
}