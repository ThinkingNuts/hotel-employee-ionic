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
  private area: string = "全部";
  private user: UserViewModel;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private account: AccountProvider,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ngOnInit() {
    this.account.getUserInfo((value) => {
      this.user = value;
    })
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
      if (popoverData && popoverData.text !== "全部") {
        this.area = popoverData.text;
        this.searchText = this.area;
      } else {
        this.area = "全部";
        this.searchText = null;
      }
    })
  }
}
