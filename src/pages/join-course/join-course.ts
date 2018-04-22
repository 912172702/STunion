import { Component ,ElementRef,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpService } from '../../service/http.service';
import { StorageService } from '../../service/storage.service';
import { Student } from '../../entity/student';
import { Configuration } from '../../config/Configuration';
import { Events } from 'ionic-angular';
/**
 * Generated class for the JoinCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join-course',
  templateUrl: 'join-course.html',
})
export class JoinCoursePage {
    user:Student;
    @ViewChild('oneView') oneView:ElementRef;
    @ViewChild('twoView') twoView:ElementRef;
    @ViewChild('threeView') threeView:ElementRef;
    @ViewChild('fourView') fourView:ElementRef;
    one:any;
    two:any;
    three:any;
    four:any;
    constructor(public ele:ElementRef,public events:Events,public storage:StorageService,public http:HttpService ,public geolocation:Geolocation,public platform:Platform,public navCtrl: NavController, public navParams: NavParams) {
        this.user = this.navParams.get('user');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JoinCoursePage');
        //添加监听
        this.one = this.oneView.nativeElement;
        this.two = this.twoView.nativeElement;
        this.three = this.threeView.nativeElement;
        this.four = this.fourView.nativeElement;
        let codes = [this.one,this.two,this.three,this.four];
        for(let i = 0; i < 3; i++){
            codes[i].oninput = ()=>{
                codes[i].disabled = true;
                codes[i + 1].focus();
            }
        }
        codes[3].oninput = ()=>{
            codes[3].disabled = true;
            this.startJoin();
        }
    }
    startJoin(){
       this.platform.ready().then(()=>{
            this.geolocation.getCurrentPosition().then(pos=>{
                let longitude = pos.coords.longitude;
                let latitude = pos.coords.latitude;
                let code:string = this.one.value + this.two.value + this.three.value + this.four.value;
                console.log('加群code:'+code);
                console.log('学生id:'+this.user.stuId);
                this.http.request('course/facejoin/s','post',{'stuId':+this.user.stuId,'code':code,'longitude':+longitude,'latitude':+latitude}).then(result=>{
                    if(result.code == Configuration.SUCCESS){
                        console.log('加入成功');
                        this.events.publish(Configuration.JOIN_COURSE_SUCCESS_EVENT,{'course':result.extend.course});

                    }else if(result.code == Configuration.COURSE_NOT_FOUND){
                        alert("未搜索到班级~")
                    }else if(result.code == Configuration.AREADY_IN_GROUP){
                        alert("您已经在群里喽~");
                    }else
                        console.log('ERROR:'+result.msg);

                    this.navCtrl.pop();
                });
            });
        });
    }
    inputOne(){
        alert('222');
    }
    cancelJoin(){
        this.navCtrl.pop();
    }

}
