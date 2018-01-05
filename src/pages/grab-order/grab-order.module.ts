import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrabOrderPage } from './grab-order';
import { CounterComponent } from '../../components/counter/counter';

@NgModule({
  declarations: [
    GrabOrderPage,
    CounterComponent
  ],
  imports: [
    IonicPageModule.forChild(GrabOrderPage),
  ],
})
export class GrabOrderPageModule {}
