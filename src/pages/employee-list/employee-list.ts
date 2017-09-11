import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmployeeItem } from '../../model/EmployeeItem';

@Component({
  selector: 'page-employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeListPage implements OnInit {

  private items: EmployeeItem[] = [{
    id: 0,
    title: 'title-00000000000000000000',
    quantity: 11,
    company: 'company-0',
    scheduling: '',
    type: '',
    start: 'string',
    end: 'string',
    billing: '10',
    desc: 'string',
    create: 'string'
  }, {
    id: 1,
    title: 'title-11111111111111111111',
    quantity: 22,
    company: 'company-1',
    scheduling: '',
    type: '',
    start: 'string',
    end: 'string',
    billing: '20',
    desc: 'string',
    create: 'string'
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit(): void {

  }

  showItemDetails(item: EmployeeItem): void {
    console.log(item);
    this.navCtrl.push("EmployeeDetailsPage", item);
  }
}

