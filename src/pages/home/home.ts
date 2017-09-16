import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("homeslides") slides: Slides;
  items = [
    {
      title: "吾乃一号",
      className: "blue"
    }, {
      title: "我是二号",
      className: "red"
    }, {
      title: "三号在此",
      className: "yellow"
    }, {
      title: "四号搁这",
      className: "green"
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