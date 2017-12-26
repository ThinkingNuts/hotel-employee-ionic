import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrabOrderPage } from './grab-order';

@NgModule({
  declarations: [
    GrabOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(GrabOrderPage),
  ],
})
export class GrabOrderPageModule {}
