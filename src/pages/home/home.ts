import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Slides, AlertController } from 'ionic-angular';

import { InfoListPage } from '../info-list/info-list';
import { TabsPage } from '../tabs/tabs';

import { AccountProvider } from '../../providers/account/account';
import { ApiService } from '../../api/api-resource';

import { ApplyViewModel } from '../../view-model/apply-model';
import { UserViewModel } from '../../view-model/user-model';

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
      }, {
        title: "我的消息",
        icon: "chatbubbles",
        color: "secondary",
        linkPage: "MessageListPage",
        isImage: false,
        imageUrl: ""
      }]
    }];
  private noRecords: boolean = true;
  private whyEmpty: string = "正在获取工作";
  private orders: ApplyViewModel[] = [];
  private user: UserViewModel;

  constructor(
    private api: ApiService,
    private account: AccountProvider,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    console.log("HomePage ngOnInit");

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getTaskList();
    });
  }

  ionViewDidEnter(): void {
    console.log("HomePage ionViewDidEnter");
    if (this.user) {
      this.getTaskList();
    }
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

  getTaskList(): void {
    this.api.getTask<ApplyViewModel[]>(this.user.GUID).then(
      res => {
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有工作");
        } else {
          this.showResult(false, "已获取工作");
          this.orders = res.filter((value) => {
            return value.GrabStatus != '已结束';
          });
        }
      },
      (error) => {
        this.handleError(error);
      });
  }

  openRoomCheck(item) {
    this.openPage("RoomCheckPage", { POrderId: item.POrderId, finished: item.GrabStatus == '已结束' });
  }

  openPage(pageName: string, params = null) {
    this.navCtrl.push(pageName, params);
  }

  showResult(isEmpty: boolean, msg: string): void {
    this.noRecords = isEmpty;
    this.whyEmpty = msg;
  }

  handleError(error: any) {
    this.showResult(true, "获取工作失败");
    console.log("An error occurred: \n", error);
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