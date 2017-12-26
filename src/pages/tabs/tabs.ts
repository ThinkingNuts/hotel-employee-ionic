import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { InfoListPage } from '../info-list/info-list';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';
import { OrderListPage } from '../order-list/order-list';

import { Storage } from '@ionic/storage';

import { AccountProvider, LoginState } from '../../providers/account/account';
import { UserViewModel } from '../../view-model/user-model';
import { from } from 'rxjs/observable/from';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public static jumpInfoPageFromHome: boolean = false;
  public static whichInfoPage: string;
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = HomePage;
  tab2Root = OrderListPage;
  tab3Root = MyPage;

  constructor(
    private account: AccountProvider,
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage) { }

  ngOnInit(): void {
    console.log("TabsPage ngOnInit");
  }

  openPage(pageName: string) {
    this.navCtrl.push(pageName);
  }
}
