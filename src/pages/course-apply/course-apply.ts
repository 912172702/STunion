import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CourseApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-apply',
  templateUrl: 'course-apply.html',
})
export class CourseApplyPage {

    week = ['日','一','二','三','四','五','六'];
    course = {};
    notification = {};
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.notification = this.navParams.get('courseApply');
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad CourseApplyDetailPage');
    }

}
