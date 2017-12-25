import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomCheckPage } from './room-check';

@NgModule({
  declarations: [
    RoomCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomCheckPage),
  ],
})
export class RoomCheckPageModule {}
