import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { EmployeeListPage } from '../employee-list/employee-list';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EmployeeListPage;
  tab3Root = MyPage;

  constructor() {

  }
}
