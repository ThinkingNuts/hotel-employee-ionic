import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelCommentsListPage } from './hotel-comments-list';

@NgModule({
  declarations: [
    HotelCommentsListPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelCommentsListPage),
  ],
})
export class HotelCommentsListPageModule {}
