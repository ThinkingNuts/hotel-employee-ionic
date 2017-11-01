import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { BaseHttpServiceProvider, JsonResult } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { MyOrderViewModel } from '../../view-model/my-order-model';

/**
 * Generated class for the FinishWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finish-work',
  templateUrl: 'finish-work.html',
})
export class FinishWorkPage {

  private order: MyOrderViewModel;
  private score: any = {
    star: 0,
    starMap: ["不满意", "还行", "一般", "满意", "很满意"]
  };
  private desc: string;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.order = navParams.get("order");
  }

  chooseStar(ev) {
    let star = parseInt(ev.target.dataset.index);
    this.score.star = star;
    console.log("FinishWorkPage chooseStar: " + ev.target.dataset.index);
    console.log("FinishWorkPage chooseStar: " + this.score.star);
    console.log("FinishWorkPage chooseStar: " + star);
  }

  askFinishWork(): void {
    this.alertCtrl.create({
      title: "提示",
      message: "确认要终止该工作吗？",
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("Disagree clicked");
        }
      }, {
        text: "确认",
        handler: () => {
          console.log("Agree clicked");
          this.finishWork();
        }
      }]
    }).present();
  }

  finishWork(): void {
    console.log("FinishWorkPage finishWork star: " + this.score.star);
    console.log("FinishWorkPage finishWork desc: " + this.desc);

    let data = {
      HotelEvaluate: this.score.star,
      HotelComment: this.desc
    };

    this.baseHttp.putJson<any, JsonResult>(data, this.urlConfig.employeeConfig.finishOrderUrl + this.order.HotelOrderId).then(
      (res) => {
        console.log("FinishWorkPage finishWork res: " + JSON.stringify(res));
        this.showToast(res.message);
        if (res.state) {
          this.navCtrl.pop();
        }
      });
  }

  showToast(msg: string): void {
    this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 2000
    }).present();
  }
}
