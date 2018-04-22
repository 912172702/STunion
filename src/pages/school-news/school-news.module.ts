import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolNewsPage } from './school-news';

@NgModule({
  declarations: [
    SchoolNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolNewsPage),
  ],
})
export class SchoolNewsPageModule {}
