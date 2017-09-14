import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { EmployeeViewModel } from '../../view-model/employee-model';

/**
 * Generated class for the ApplyRecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-records',
  templateUrl: 'apply-records.html',
})
export class ApplyRecordsPage {

  private noRecords: boolean = true;
  private whyEmpty: string = "当前没有申请记录";
  private items: EmployeeViewModel[] = new Array<EmployeeViewModel>();
  private item0: EmployeeViewModel = new EmployeeViewModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseHttp: BaseHttpServiceProvider,
    public urlConfig: AppUrlConfigProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyRecordsPage');
  }

  ngOnInit(): void {
    console.log("ApplyRecordsPage ngOnInit");

    // test code
    this.noRecords = false;
    this.item0.Id = 0;
    this.item0.Title = "000000000000000000000";
    this.item0.Num = 10;
    this.item0.HotelName = "company0";
    this.item0.ScheduleName = "白班";
    this.item0.Billing = "￥30/h";
    this.item0.TimeStr = "xxxxx";
    this.items.push(this.item0);

    // this.getList(null);
  }

  getList(refresher): void {
    this.baseHttp.postJson<EmployeeViewModel, EmployeeViewModel[]>(new EmployeeViewModel(),
      this.urlConfig.employeeConfig.applyRecordsUrl)
      .subscribe(
      (res) => {
        console.log(res);
        if (!res) {
          this.showGetFailed();
          return;
        }
        this.noRecords = false;
        this.items = res;
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
      }
      );
  }

  showGetFailed(): void {
    this.noRecords = true;
    this.whyEmpty = "获取申请记录失败";
  }

  handleError(error: any) {//: Promise<any> {
    this.showGetFailed();
    console.log("An error occurred: \n", error);
    // return Promise.reject(error.message || error);
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    // this.getList(refresher);
  }

  showItemDetails(item: EmployeeViewModel): void {
    console.log(item);
    this.navCtrl.push("ApplyDetailsPage", item);
  }
}
