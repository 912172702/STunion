import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowMemberDetailPage } from './show-member-detail';

@NgModule({
  declarations: [
    ShowMemberDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowMemberDetailPage),
  ],
})
export class ShowMemberDetailPageModule {}
