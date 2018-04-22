import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { NoticeProvider } from '../../providers/notice/notice';
/**
 * Generated class for the MyCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-courses',
  templateUrl: 'my-courses.html',
})
export class MyCoursesPage {
    week = ['星期日','星期一','星期三','星期四','星期五','星期六'];
    user:any;
    courses = [];
    constructor(public notice:NoticeProvider,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.user = this.navParams.get('user');
        this.http.request('course/getAllByStuId/' + this.user.stuId,'get',{}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.courses = result.extend.courses;
            }
        });
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad MyCoursesPage');
    }
    joinRemind(course:any){
        this.http.request('course/teacherJoinRemind/'+course.cId,'PUT',{}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                course.callTotal = 1;
                this.notice.showToast('加入提醒成功');
            }
        });
    }
    cancelRemind(course:any){
        this.http.request('course/teacherCancelRemind/'+course.cId,'PUT',{}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                course.callTotal = 0;
                this.notice.showToast('取消提醒成功');
            }
        });
    }
}
