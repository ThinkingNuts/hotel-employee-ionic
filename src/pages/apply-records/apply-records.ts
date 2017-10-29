import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

import { ApplyViewModel } from '../../view-model/apply-model';
import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the ApplyRecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-apply-records',
  templateUrl: 'apply-records.html'
})
export class ApplyRecordsPage {

  private noRecords: boolean = true;
  private whyEmpty: string = "正在获取申请记录";
  private items: ApplyViewModel[] = [];
  private itemsCache: ApplyViewModel[] = [];
  private user: UserViewModel;

  @Input()
  set searchText(text: string) {
    this.items = this.itemsCache.filter((item) => {
      if (!text) {
        console.log("ApplyRecordsPage: set searchText: text is empty");
        return true;
      }
      let s = item.Order.HotelName + item.Order.AreaName;
      let res = (s.indexOf(text) > -1);
      console.log("res::::: " + res);
      return res;
    })
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private account: AccountProvider,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) {
  }

  ngOnInit(): void {
    console.log("ApplyRecordsPage ngOnInit");

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getList(null);
    });
  }

  getList(refresher): void {
    let personGUID = this.user.GUID;
    this.baseHttp.get<ApplyViewModel[]>(this.urlConfig.employeeConfig.applyRecordsUrl + personGUID)
      .then(
      (res) => {
        console.log("ApplyRecords: " + JSON.stringify(res));
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有申请记录");
        } else {
          this.showResult(false, "已获取申请记录");
          this.items = res;
          this.itemsCache = res;
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

  handleError(error: any) {//: Promise<any> {
    this.showResult(true, "获取申请记录失败");
    console.log("An error occurred: \n", error);
    // return Promise.reject(error.message || error);
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getList(refresher);
  }

  showItemDetails(item: ApplyViewModel): void {
    console.log(item);
    this.navCtrl.push("ApplyDetailsPage", item);
  }
}
