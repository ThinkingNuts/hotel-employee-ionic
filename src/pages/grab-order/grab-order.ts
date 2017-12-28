import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';
import { ApplyViewModel } from '../../view-model/apply-model';
import { HotelViewModel } from '../../view-model/hotel-model';
import { Storage } from '@ionic/storage';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';
import { Item } from 'ionic-angular/components/item/item';
import { elementAt } from 'rxjs/operator/elementAt';

/**
 * Generated class for the GrabOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grab-order',
  templateUrl: 'grab-order.html',
})
export class GrabOrderPage {

  private item: EmployeeViewModel = null;
  private callback;
  private hotelDetails: HotelViewModel = null;
  private order: OrderModule = new OrderModule();
  private grabNum: number;

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private alert: AlertController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private account: AccountProvider,
    private storage: Storage
  ) {
    this.item = navParams.get("item");
    this.callback = navParams.get("callback");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrabOrderPage');
    this.account.getUserInfo((value) => {
      console.log("GrabOrderPage: user:: " + JSON.stringify(value));
      this.order.PersonId = value.Id;
      console.log("GrabOrderPage: personId:: " + this.order.PersonId);
    })
  }

  ngOnInit(): void {
    console.log('ngOnInit GrabOrderPage');
    if (this.item) {
      this.getHotelDetails(this.item.HotelGUID);
    }
  }

  operGrabNum(symbol: number) {
    if (symbol < 0) {
      if (this.grabNum > this.item.Min) {
        this.grabNum--;
      }
    } else if (symbol > 0) {
      if (this.grabNum < this.item.Max) {
        this.grabNum++;
      }
    }
  }

  askApply(): void {
    this.alert.create({
      title: "提示",
      message: "确认要申请吗？",
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("Disagree clicked");
        }
      }, {
        text: "确认",
        handler: () => {
          console.log("Agree clicked");
          this.doApply();
        }
      }]
    }).present();
  }

  doApply(): void {
    this.order.OrderId = this.item.Id;
    this.order.Mark = this.item.Mark;
    this.order.Num = this.grabNum;
    this.baseHttp.postJson2<OrderModule, any>(this.order, this.urlConfig.employeeConfig.applyUrl).then(
      d => {
        console.log("GrabOrderPage: Apply result " + JSON.stringify(d));
        if (d.state) {
          this.showApplyResult(d);
          this.callback(d.state);
          this.navCtrl.pop();
        } else {
          this.promptInfo(d.message, d.code);
        }
      }).catch(this.handleError);
  }

  handleError(error: any) {
    console.log("An error occurred to apply: \n", error);
  }

  private showApplyResult(msg: JsonResult): void {
    this.showToast(msg.message);
  }

  private showToast(msg: string) {
    this.toast.create({
      message: msg,
      duration: 2000,
      position: "top"
    }).present();
  }

  getHotelDetails(hotelGUID: string): void {
    this.baseHttp.post<any, JsonResult>(null,
      this.urlConfig.employeeConfig.hotelDetailsUrl + hotelGUID)
      .then(d => {
        console.log("GrabOrderPage: HotelDetails:: " + JSON.stringify(d));
        if (d.state == true) {
          this.hotelDetails = d["data"];
        }
      })
      .catch(this.handleError);
  }

  showMap(lng: string, lat: string): void {
    let lngNum: number = parseFloat(lng);
    let latNum: number = parseFloat(lat);
    console.log("showMap:: lng:" + lng + "  lat:" + lat);
    this.navCtrl.push("BaiduMapPage", {
      "lng": lng,
      "lat": lat
    });
  }

  showHotelComments(): void {
    this.navCtrl.push("HotelCommentsListPage", { "hotelGUID": this.hotelDetails.GUID });
  }

  promptInfo(msg, code): void {
    this.alert.create({
      title: "提示",
      message: msg,
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("Disagree clicked");
        }
      }, {
        text: "确认",
        handler: () => {
          console.log("Agree clicked");
          if (code == 4001) {
            this.navCtrl.push("PersonDetailsPage");
          }
        }
      }]
    }).present();
  }
}

export class OrderModule extends BaseViewModel {
  public PersonId: number;
  public OrderId: number;
  public Mark: string;
  public Num: number;
}
