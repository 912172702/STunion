import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service'
import { NotificationPage } from '../../pages/notification/notification';
import { CourseApplyPage } from '../../pages/course-apply/course-apply';
/**
 * Generated class for the NotificationHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-history',
  templateUrl: 'notification-history.html',
})
export class NotificationHistoryPage {
    course:any;
    noteList = [];
    constructor(public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.http.request('teacher/getNotificationsByCId/0','get',{cId:this.course.cId}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.noteList = result.extend.notes;
            }
        });
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationHistoryPage');
    }

    getType(note:any){
        console.log(JSON.stringify(note));
        if(note.nType == Configuration.NORMAL_NOTIFICATION_TYPE)
            return '普通通知';
        else if(note.nType == Configuration.COURSE_APPLY_TYPE)
            return '课程预约';
    }
    checkDetail(note:any){
        if(note.nType == Configuration.NORMAL_NOTIFICATION_TYPE)
            this.navCtrl.push(NotificationPage,{course:this.course,notification:note});
        else if(note.nType == Configuration.COURSE_APPLY_TYPE)
            this.navCtrl.push(CourseApplyPage,{course:this.course,courseApply:note});

    }
}
