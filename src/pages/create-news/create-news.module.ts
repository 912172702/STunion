import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewsPage } from './create-news';

@NgModule({
  declarations: [
    CreateNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewsPage),
  ],
})
export class CreateNewsPageModule {}
