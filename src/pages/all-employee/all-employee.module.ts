import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllEmployeePage } from './all-employee';

@NgModule({
  declarations: [
    AllEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(AllEmployeePage),
  ],
})
export class AllEmployeePageModule {}
