import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseApplyDetailPage } from './course-apply-detail';

@NgModule({
  declarations: [
    CourseApplyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseApplyDetailPage),
  ],
})
export class CourseApplyDetailPageModule {}
