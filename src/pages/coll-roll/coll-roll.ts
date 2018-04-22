import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,Events} from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service';
import { Geolocation } from '@ionic-native/geolocation';
import { NoticeProvider } from '../../providers/notice/notice';
/**
 * Generated class for the CollRollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coll-roll',
  templateUrl: 'coll-roll.html',
})
export class CollRollPage {
    user:any;
    course:any;
    attendStatus = {'absenceCnt':0};
    status = 0;
    token:string = '';
    constructor(public events:Events,public notice:NoticeProvider,public geolocation:Geolocation,public platForm:Platform,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.user = navParams.get('user');
        this.course = navParams.get('course');
        this.http.request('student/attendStatus','GET',{'cId':+this.course.cId,'stuId':this.user.stuId}).then((data)=>{
            if(data.code == Configuration.SUCCESS){
                this.attendStatus = data.extend.attendStatus;
                console.log(JSON.stringify(this.attendStatus));
                let absenceCnt =this.attendStatus.absenceCnt;
                if(absenceCnt < 2) this.status = 1;
                else if(absenceCnt >= 2 && absenceCnt <= 4) this.status = 2;
                else if(absenceCnt > 4) this.status = 3;
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CollRollPage');
    }
    getHeadIconSrc(){
        return Configuration.DOMAIN_PROJECT + this.user.headIcon;
    }
    callRoll(){
        this.platForm.ready().then(()=>{
            this.geolocation.getCurrentPosition().then(pos=>{
                let longitude = pos.coords.longitude;
                let latitude = pos.coords.latitude;
                this.http.request('student/callroll','GET',{'cId':+this.course.cId,'stuId':+this.user.stuId,'longitude':longitude,'latitude':latitude,'token':this.token}).then(data=>{
                    if(data.code == Configuration.SUCCESS){
                        this.notice.showToast('考勤成功！');
                        //发布考勤成功事件
                        this.events.publish(Configuration.CALL_ROLL_SUCCESS_EVENT,{'course':this.course});
                        this.navCtrl.pop();
                    }else{
                        this.notice.showToast(data.msg);
                        this.navCtrl.pop();
                    }
                });
            });
        });
    }
}
