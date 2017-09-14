import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';

/**
 * Generated class for the ApplyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-details',
  templateUrl: 'apply-details.html',
})
export class ApplyDetailsPage implements OnInit{

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

}
