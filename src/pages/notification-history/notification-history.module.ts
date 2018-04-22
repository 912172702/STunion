import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationHistoryPage } from './notification-history';

@NgModule({
  declarations: [
    NotificationHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationHistoryPage),
  ],
})
export class NotificationHistoryPageModule {}
