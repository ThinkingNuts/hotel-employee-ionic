import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRecordsPage } from './my-records';

@NgModule({
  declarations: [
    MyRecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRecordsPage),
  ],
})
export class MyRecordsPageModule {}
