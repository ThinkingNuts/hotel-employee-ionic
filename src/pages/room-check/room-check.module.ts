import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomCheckPage } from './room-check';
import { RoomComponent } from '../../components/room/room';

@NgModule({
  declarations: [
    RoomCheckPage,
    RoomComponent
  ],
  imports: [
    IonicPageModule.forChild(RoomCheckPage),
  ],
})
export class RoomCheckPageModule { }
