import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';
import { ApiService } from '../../api/api-resource';

import { ApplyViewModel } from '../../view-model/apply-model';
import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  private noRecords: boolean = true;
  private whyEmpty: string = "正在获取工作";
  private orders: ApplyViewModel[] = [];
  private ordersCache: ApplyViewModel[] = [];
  private user: UserViewModel;

  constructor(
    private api: ApiService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private account: AccountProvider,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) {
  }

  ngOnInit(): void {
    console.log("TaskPage ngOnInit");

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getList(null);
    });
  }

  ionViewDidEnter(): void {
    console.log("TaskPage ionViewDidEnter");
    if (this.user) {
      this.getList(null);
    }
  }

  getList(refresher): void {
    this.api.getTask<ApplyViewModel[]>(this.user.GUID).then(
      res => {
        // console.log("TaskPage order: " + JSON.stringify(res));
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有工作");
        } else {
          this.showResult(false, "已获取工作");
          this.orders = res;
          this.ordersCache = res;
        }
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
      });
  }

  showResult(isEmpty: boolean, msg: string): void {
    this.noRecords = isEmpty;
    this.whyEmpty = msg;
  }

  handleError(error: any) {
    this.showResult(true, "获取工作失败");
    console.log("An error occurred: \n", error);
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getList(refresher);
  }

  openRoomCheck(item) {
    this.openPage("RoomCheckPage", { POrderId: item.POrderId, finished: item.GrabStatus == '已结束' });
  }

  finishWork(order: ApplyViewModel, commentable: boolean): void {
    this.openFinishWork(order, commentable);
  }

  openFinishWork(order: ApplyViewModel, commentable: boolean): void {
    // this.navCtrl.push("FinishWorkPage", { "order": order, "commentable": commentable });
  }

  openPage(pageName: string, params = null) {
    this.navCtrl.push(pageName, params);
  }
}
