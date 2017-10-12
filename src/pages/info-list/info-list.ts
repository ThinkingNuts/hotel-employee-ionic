import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController, PopoverController, AlertController } from 'ionic-angular';

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
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.area = this.areaAll;
  }

  ngOnInit() {
    this.account.getUserInfo((value) => {
      this.user = value;
    })
  }

  searchItems(event: any) {
    this.searchText = event.target.value;
    console.log("InfoListPage: searchItems:: searchText == " + this.searchText);
  }

  switchArea(): void {
    console.log("InfoListPage: selectArea");
    this.openPage("CitySelectPage", {
      "callback": (areaSelected: AreaViewModel) => {
        return new Promise((resolve, reject) => {
          console.log("EmployeeListPage: callback:: " + areaSelected.text);
          this.area = areaSelected;
        })
      }
    });
  }

  openPage(pageName: string, param?): void {
    this.app.getRootNav().push(pageName, param);
  }

  handleError(error: any) {
    console.log("An error occurred: \n", error);
  }
}
