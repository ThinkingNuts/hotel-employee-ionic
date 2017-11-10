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
  private gridMenu = [
    {
      rowId: 1,
      cols: [{
        title: "我的工作",
        icon: "cube",
        color: "primary",
        linkPage: "MyOrderPage",
        isImage: false,
        imageUrl: ""
      }, {
        title: "个人资料",
        icon: "document",
        color: "bright",
        linkPage: "PersonDetailsPage",
        isImage: false,
        imageUrl: ""
      }, {
        title: "我的消息",
        icon: "chatbubbles",
        color: "secondary",
        linkPage: "MessageListPage",
        isImage: false,
        imageUrl: ""
      }, {
        title: "设置",
        icon: "settings",
        color: "dark",
        linkPage: "SettingsPage",
        isImage: false,
        imageUrl: ""
      }]
    }];

  constructor(
    private navCtrl: NavController
  ) { }

  openPage(pageName: string) {
    if (!pageName || pageName.length == 0) {
      return;
    }
    this.navCtrl.push(pageName);
  }

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