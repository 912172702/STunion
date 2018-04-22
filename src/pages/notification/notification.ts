import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
    notification={};
    course={};
    user = {};
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.notification = this.navParams.get('notification');
        this.course = this.navParams.get('course');
        //this.user = this.navParams.get('user');
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    }

}
