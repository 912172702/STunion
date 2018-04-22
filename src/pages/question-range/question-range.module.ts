import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionRangePage } from './question-range';

@NgModule({
  declarations: [
    QuestionRangePage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionRangePage),
  ],
})
export class QuestionRangePageModule {}
