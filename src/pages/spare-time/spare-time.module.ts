import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpareTimePage } from './spare-time';

@NgModule({
  declarations: [
    SpareTimePage,
  ],
  imports: [
    IonicPageModule.forChild(SpareTimePage),
  ],
})
export class SpareTimePageModule {}
