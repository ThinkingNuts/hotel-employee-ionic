import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { InfoListPage } from '../info-list/info-list';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';

import { AccountProvider, LoginState } from '../../providers/account/account';
import { UserViewModel } from '../../view-model/user-model';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = HomePage;
  tab2Root = InfoListPage;
  tab3Root = MyPage;

  constructor(
    private account: AccountProvider,
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage) { }

  ngOnInit(): void {
    console.log("TabsPage ngOnInit");
    this.checkLogin();
  }

  checkLogin(): void {
    this.account.checkLogin((res: LoginState) => {
      console.log("TabsPage: checkLogin res:: " + res.desc);

      if (!res.state) {
        this.openPage("LoginPage");
      }
    });
  }

  openPage(pageName: string) {
    this.navCtrl.push(pageName);
  }
}
