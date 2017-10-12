import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitySelectPage } from './city-select';

@NgModule({
  declarations: [
    CitySelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CitySelectPage),
  ],
})
export class CitySelectPageModule {}
