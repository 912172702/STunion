import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,PopoverController,AlertController} from 'ionic-angular';
import { GroupManagePage } from '../../pages/group-manage/group-manage';
import { Configuration } from '../../config/Configuration';
import { NoticeProvider } from '../../providers/notice/notice';
import { CollRollPage } from '../coll-roll/coll-roll';
import { SpareTimePage } from '../../pages/spare-time/spare-time';
import { NotificationPage } from '../../pages/notification/notification';
import { CourseApplyPage } from '../../pages/course-apply/course-apply';
import { HttpService } from '../../service/http.service';
/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
  course:any;
  user:any;
  //showCallBackNote = true;
  showCallBackNote = false;
  showSpareTimeNote = false;
  showNotificationNote = false; 
  showCourseApplyNote = false;
  callBackTime = 0;
  timeStr:string;
  notification:any;
  courseApply:any;
  showQuestionNote = false;
  answerArray = [];
  question:any;
  _answer = '';
  btnDisabled = false;
  btnText='确认答案';
  constructor(public alertCtrl:AlertController,public http:HttpService,public popoverCtrl:PopoverController,public note:NoticeProvider,public events:Events,public navCtrl: NavController, public navParams: NavParams) {
      this.course = this.navParams.get('course');
      this.user = this.navParams.get('user');
      this.events.subscribe(Configuration.SIMPLE_CALL_ROLL_EVENT,data=>{
          if(data.cId != this.course.cId)return;
          this.callBackTime = +data.time;
          this.showCallRollBar();
      });
      this.events.subscribe(Configuration.CALL_ROLL_SUCCESS_EVENT,(data)=>{
          if(data.course.cId != this.course.cId)return;
          this.showCallBackNote = false;
          this.callBackTime = 0;
      });

      this.events.subscribe(Configuration.SPARE_TIME_EVENT,(data)=>{
        if(this.course.cId != data.cId)return;
        this.showSpareTimeNote = true;
        this.timeStr = data.timeStr;
      });

      this.events.subscribe(Configuration.NORMAL_NOTIFICATION_EVENT,(data)=>{
        if(this.course.cId != data.cId)return;
        this.showNotificationNote = true;
        this.notification = data.notification;
      });

      this.events.subscribe(Configuration.COURSE_APPLY_EVENT,(data)=>{
        if(this.course.cId != data.cId)return;
        this.showCourseApplyNote = true;
        this.courseApply = data.courseApply;
      });

      this.events.subscribe(Configuration.PUBLISH_QUESTION_EVENT,(data)=>{
        if(this.course.cId != data.cId)return;
        this.question = data.question;
        this.btnDisabled = false;
        this.btnText='确认答案';
        this.setAnswerList();
        this.showQuestionNote = true;
      });
      this.events.subscribe(Configuration.ANSWER_RESULT_EVENT,(data)=>{
        if(this.course.cId != data.cId)return;
        let myAlert = this.alertCtrl.create({
          message: data.isRight ? '恭喜你,答对了!':'很遗憾,请再接再厉!',
          buttons:[
            {
              text:'确定',
              handler:()=>{
                this.showQuestionNote = false;
              }
            }
          ]
        });
        myAlert.present();
      });
      this.events.subscribe(Configuration.STOP_QUESTION_EVENT,()=>{
        this.showQuestionNote = false;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursePage');
  }
  groupInfo(){
      this.navCtrl.push(GroupManagePage,{'course':this.course});
  }
  ionViewWillEnter(){
      console.log(this.showCallBackNote);
      console.log(this.callBackTime);
  }
  showCallRollBar(){
      this.showCallBackNote = true;
      let sn = setInterval(()=>{
          this.callBackTime--;
          if(this.callBackTime == 0){
              this.stopCallRoll();
              clearInterval(sn);
          }
      },1000);

  }
  stopCallRoll(){
      this.note.showToast('考勤已结束！');
  }
  goCallRoll(){
      //来到签到页面进行签到
      console.log('goCallRoll');
      this.popoverCtrl.create(CollRollPage,{'course':this.course,'user':this.user},{
          enableBackdropDismiss:false
      }).present();
  }
  goSpareTime(){
    this.showSpareTimeNote = false;
    this.navCtrl.push(SpareTimePage,{course:this.course,timeStr:this.timeStr});
  }
  goNotification(){
    this.showNotificationNote = false;
    this.navCtrl.push(NotificationPage,{notification:this.notification,course:this.course,user:this.user})
  }
  goCourseApply(){
    this.showCourseApplyNote = false;
    this.navCtrl.push(CourseApplyPage,{courseApply:this.courseApply,course:this.course,user:this.user});
  }
  setAnswerList(){
        if(this.question == undefined || this.question.type == Configuration.QUESTION_FILL_BLANK_TYPE) return;
        let answerStr:string = this.question.answerList;
        this.answerArray = answerStr.split('#');
        let cnt = 0;
        for(;cnt < this.answerArray.length; cnt++){
            if(this.answerArray[cnt] != '')
                this.answerArray[cnt] = String.fromCharCode(cnt + 65) + '. '+this.answerArray[cnt];
            else{
                this.answerArray.splice(cnt,1);
                cnt--;
            }
        } 
        console.log(JSON.stringify(this.answerArray));
    }
  submit(){
    this.http.request('question/answer','post',{stuId:this.user.stuId,cId:this.course.cId,answer:this._answer}).then(result=>{
      if(result.code == Configuration.SUCCESS){
        this.note.showToast('答题成功,请等待答案揭晓~');
        this.btnDisabled = true;
        this.btnText = '已提交，等待结果~';
      }
    });
  }
  optionChange(index:number){
    this._answer = String.fromCharCode(65 + index);
  }
}
