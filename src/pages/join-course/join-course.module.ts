import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinCoursePage } from './join-course';

@NgModule({
  declarations: [
    JoinCoursePage,
  ],
  imports: [
    IonicPageModule.forChild(JoinCoursePage),
  ],
})
export class JoinCoursePageModule {}
