import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { ApplyViewModel } from '../../view-model/apply-model';

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
  private whyEmpty: string = "正在获取任务";
  private items: ApplyViewModel[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  ngOnInit(): void {
    console.log("ApplyRecordsPage ngOnInit");

    this.getList(null);
  }

  getList(refresher): void {
    let personId = 6;
    this.baseHttp.postJson<ApplyViewModel, ApplyViewModel[]>(new ApplyViewModel(),
      this.urlConfig.employeeConfig.applyRecordsUrl + personId)
      .subscribe(
      (res) => {
        console.log(res);
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有任务");
          return;
        }
        this.showResult(false, "已获取任务");
        // this.items = res;
        res.forEach(e => {
          if (e.Status == "2") {
            this.items.push(e);
          }
        });
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
      }
      );
  }

  showResult(isEmpty: boolean, msg: string): void {
    this.noRecords = isEmpty;
    this.whyEmpty = msg;
  }

  handleError(error: any) {//: Promise<any> {
    this.showResult(true, "获取任务失败");
    console.log("An error occurred: \n", error);
    // return Promise.reject(error.message || error);
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getList(refresher);
  }
}
