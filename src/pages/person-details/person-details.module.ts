import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonDetailsPage } from './person-details';

@NgModule({
  declarations: [
    PersonDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonDetailsPage),
  ],
})
export class PersonDetailsPageModule {}
