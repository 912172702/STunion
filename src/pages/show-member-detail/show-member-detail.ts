import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { Student } from '../../entity/student';
/**
 * Generated class for the ShowMemberDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-member-detail',
  templateUrl: 'show-member-detail.html',
})
export class ShowMemberDetailPage {
    student = new Student();
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.student = navParams.get('student');
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad ShowMemberDetailPage');
    }
    getHeadIconSrc(){
        return Configuration.DOMAIN_PROJECT + this.student.headIcon;
    }
}
