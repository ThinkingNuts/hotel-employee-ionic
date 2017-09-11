import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeDetailsPage } from './employee-details';

@NgModule({
  declarations: [
    EmployeeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeDetailsPage),
  ],
})
export class EmployeeDetailsPageModule {}
