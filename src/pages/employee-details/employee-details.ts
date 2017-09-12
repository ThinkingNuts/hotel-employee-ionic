import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';

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
export class EmployeeDetailsPage implements OnInit{

  private item: EmployeeViewModel = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailsPage');
  }

  ngOnInit(): void {
    console.log('ngOnInit EmployeeDetailsPage');
    
  }

  onApply(): void {
    console.log('onApply EmployeeDetailsPage');
    

  }

}
