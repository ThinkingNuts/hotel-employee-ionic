import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';
import { ApplyViewModel } from '../../view-model/apply-model';
import { HotelViewModel } from '../../view-model/hotel-model';
import { Storage } from '@ionic/storage';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the EmployeeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-details',
  templateUrl: 'employee-details.html',
})
export class EmployeeDetailsPage implements OnInit {

  private item: EmployeeViewModel = null;
  private callback;
  private hotelDetails: HotelViewModel = null;
  private mOrder: OrderModule = new OrderModule();

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
    console.log('ionViewDidLoad EmployeeDetailsPage');
    this.account.getUserInfo((value) => {
      console.log("EmployeeDetails: user:: " + JSON.stringify(value));
      this.mOrder.PersonId = value.Id;
      console.log("EmployeeDetails: personId:: " + this.mOrder.PersonId);
    })
  }

  ngOnInit(): void {
    console.log('ngOnInit EmployeeDetailsPage');
    this.getHotelDetails(this.item.HotelGUID);
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
          this.onApply();
        }
      }]
    }).present();
  }

  onApply(): void {
    console.log('onApply EmployeeDetailsPage');
    this.mOrder.OrderId = this.item.Id;
    this.mOrder.Status = 1;
    this.mOrder.GUID = this.item.GUID;
    this.mOrder.Mark = this.item.Mark;
    this.toApply(this.mOrder);
  }

  toApply(order: OrderModule): void {
    this.baseHttp.post<OrderModule, JsonResult>(order,
      this.urlConfig.employeeConfig.applyUrl).then(
      d => {
        console.log("Apply result " + JSON.stringify(d));
        let mes: string = d.message;
        this.showApplyResult(d);
        if (d.state) {
          this.callback(d.state);//.then(() => { this.navCtrl.pop() })
          this.navCtrl.pop();
        }
      }).catch(this.handleError);
  }

  handleError(error: any) {
    console.log("An error occurred to apply: \n", error);
  }

  private showApplyResult(msg: JsonResult): void {
    this.toast.create({
      message: msg.message,
      duration: 2000,
      position: "top"
    }).present();
  }

  showHotelDetails(hotel: HotelViewModel): void {
    if (!hotel) return;
    this.navCtrl.push("HotelDetailsPage", hotel);
  }

  getHotelDetails(hotelGUID: string): void {
    this.baseHttp.post<any, JsonResult>(null,
      this.urlConfig.employeeConfig.hotelDetailsUrl + hotelGUID)
      .then(d => {
        console.log("HotelDetails:: " + JSON.stringify(d));
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
}

export class OrderModule extends BaseViewModel {
  public PersonId: number;
  public OrderId: number;
  public Status: number;
  public Mark: string;
  public GUID: string;

  ObjectToSerialize() {
    return `PersonId=${this.PersonId}&OrderId=${this.OrderId}&Status=${this.Status}&Mark=${this.Mark}
    &GUID=${this.GUID}`;
  }
}
