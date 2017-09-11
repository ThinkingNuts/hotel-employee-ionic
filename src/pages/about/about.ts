import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmployeeItem } from '../../model/EmployeeItem';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  items: EmployeeItem[] = [{
    id: 0,
    title: 'title-00000000000000000000',
    company: 'company-0',
    money: 10
  }, {
    id: 1,
    title: 'title-11111111111111111111',
    company: 'company-1',
    money: 20
  }, {
    id: 2,
    title: 'title-22222222222222222222',
    company: 'company-2',
    money: 30
  }, {
    id: 3,
    title: 'title-33333333333333333333',
    company: 'company-3',
    money: 40
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  showItemDetails(item: EmployeeItem): void {
    console.log(item);
    this.navCtrl.push("EmployeeDetailsPage", item);
  }
}

