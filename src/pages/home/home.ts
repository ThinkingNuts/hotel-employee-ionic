import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Slides, AlertController } from 'ionic-angular';

import { InfoListPage } from '../info-list/info-list';
import { TabsPage } from '../tabs/tabs';

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
      imgSrc: "assets/img/3.jpg"
    }
  ];
  private gridMenu = [
    {
      rowId: 1,
      cols: [{
        title: "用工列表",
        value: "employee-list",
        icon: "list-box",
        color: "primary",
        linkPage: "InfoListPage",
        tabId: 1,
        isImage: false,
        imageUrl: ""
      }, {
        title: "我的工作",
        icon: "cube",
        color: "bright",
        // linkPage: "MyOrderPage",
        linkPage: "TaskPage",
        isImage: false,
        imageUrl: ""
      }]
    }, {
      rowId: 2,
      cols: [{
        title: "RoomCheck",
        icon: "hand",
        color: "pink",
        linkPage: "RoomCheckPage",
        isImage: false,
        imageUrl: ""
      }
      /* {
        title: "我的申请",
        value: "apply-records",
        icon: "hand",
        color: "pink",
        linkPage: "MyRecordsPage",
        tabId: 1,
        isImage: false,
        imageUrl: ""
      } */, {
        title: "我的消息",
        icon: "chatbubbles",
        color: "secondary",
        linkPage: "MessageListPage",
        isImage: false,
        imageUrl: ""
      }]
    }];

  constructor(
    private navCtrl: NavController
  ) { }

  openPage(pageName: string) {
    this.navCtrl.push(pageName);
  }

  openPageFromMenu(col) {
    if (!col.linkPage || col.linkPage.length == 0) {
      return;
    }
    if (!col.tabId) {
      this.navCtrl.push(col.linkPage);
    } else {
      TabsPage.jumpInfoPageFromHome = true;
      TabsPage.whichInfoPage = col.value;
      this.navCtrl.parent.select(col.tabId);
    }
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