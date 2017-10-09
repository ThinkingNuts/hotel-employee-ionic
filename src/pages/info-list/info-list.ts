import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, AlertController } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

import { AreaViewModel } from '../../view-model/area-model';
import { UserViewModel } from '../../view-model/user-model';

import { AreaSelectorComponent } from '../../components/area-selector/area-selector';

/**
 * Generated class for the InfoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info-list',
  templateUrl: 'info-list.html',
})
export class InfoListPage {

  private page: string = "employee-list";
  private searchText: string;
  private areaAll: AreaViewModel = {
    id: 0,
    text: "上海",
    ObjectToSerialize: () => ""
  };
  private area: AreaViewModel;
  private user: UserViewModel;
  private areas: AreaViewModel[] = [];
  private hintMsg: string;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private account: AccountProvider,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.area = this.areaAll;
  }

  ngOnInit() {
    this.account.getUserInfo((value) => {
      this.user = value;
    })
    this.getAreas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoListPage');
  }

  searchItems(event: any) {
    this.searchText = event.target.value;
    console.log("InfoListPage: searchItems:: searchText == " + this.searchText);
  }

  switchArea(): void {
    console.log("InfoListPage: selectArea");
    this.showAreas();
  }

  showAreas(): void {
    let areasPopover = this.popoverCtrl.create(AreaSelectorComponent, {}, {
      enableBackdropDismiss: true,
      cssClass: "position: absolute; top:0;"
    });
    areasPopover.present();

    areasPopover.onDidDismiss((popoverData: AreaViewModel) => {
      console.log("InfoListPage: showAreas onDidDismiss:: " + JSON.stringify(popoverData));
      if (popoverData && popoverData.text !== this.areaAll.text) {
        this.area = popoverData;
      } else {
        this.area = this.areaAll;
      }
    })
  }

  getAreas(): void {
    this.baseHttp.post<any, AreaViewModel[]>(null, this.urlConfig.employeeConfig.areasInfoUrl)
      .then((response) => {
        console.log("AreaSelector: getAreas:: " + JSON.stringify(response));
        this.areas = response || [];
      })
      .catch(this.handleError);
  }

  handleError(error: any) {//: Promise<any> {
    this.hintMsg = "获取城市区域失败";
    console.log("An error occurred: \n", error);
  }
}
