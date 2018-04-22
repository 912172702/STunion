import { Component, ViewRef } from '@angular/core';
import { NavController,PopoverController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StorageService } from '../../service/storage.service';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { JoinCoursePage } from '../../pages/join-course/join-course';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpService } from '../../service/http.service';
import { ChangeDetectorRef } from '@angular/core';
import { Events } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { CoursePage } from '../../pages/course/course';
import { MyCoursesPage } from '../../pages/my-courses/my-courses';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    courses=[];
    user: any; 
    constructor(public http:HttpService,public events:Events,public changeDetector:ChangeDetectorRef,public ws:WebsocketProvider,public popoverCtrl:PopoverController,public navCtrl: NavController,private menuCtrl:MenuController,private local:StorageService) {
        //this.local.remove('courses');
        this.local.read('user').then(user=>this.user = JSON.parse(user)).then(()=>this.initCourse());
        this.events.subscribe(Configuration.JOIN_COURSE_SUCCESS_EVENT,(data)=>{
            //console.log(JSON.stringify('JOIN_COURSE_SUCCESS_EVENT : '+data));
            this.courses.push(data.course);
            this.local.write('courses',this.courses);
            if(!(this.changeDetector as ViewRef).destroyed)
                this.changeDetector.detectChanges();
            this.navCtrl.push(CoursePage,{'course':data.course});
        });

        //订阅用户信息改变事件
        this.events.subscribe(Configuration.USER_CHANGE_EVENT,(data)=>{
            this.user = data.user;
            if(!(this.changeDetector as ViewRef).destroyed)
                this.changeDetector.detectChanges();
        });
    }
    initCourse(){
         /*this.local.read('courses').then((data)=>{
            if(data == null || data == undefined)
                this.local.write('courses',[]);
            else
                this.courses = JSON.parse(data);
                this.changeDetector.detectChanges();
        });*/
        if(this.user == undefined || this.user == null)return ;
        this.http.request('course/getAllByStuId/'+this.user.stuId,'GET',{}).then((data)=>{
            if(data.code == Configuration.SUCCESS){
                this.courses = data.extend.courses;
                console.log(JSON.stringify(this.courses));
            }else{
                alert(data.msg);
            }
        }).then(()=>{
            this.local.write('courses',this.courses);
        });
    }
    logout(){
        console.log("登出");
        this.navCtrl.push(LoginPage);
        console.log(this.navCtrl.length());
    }
    ionViewDidLoad(){
    }

    ionViewWillEnter() {
    }
    openMenu(){
        this.menuCtrl.open();
    } 
    closeMenu(){
        this.menuCtrl.close();
    }
    toggleMenu(){
        this.menuCtrl.toggle();
    }
    joinByfaceToface(){
        let pagePopover = this.popoverCtrl.create(JoinCoursePage,{'user':this.user},{
            enableBackdropDismiss:false,
            cssClass:'custom-popover'
        });

       pagePopover.present();
    }
    goToCourse(course:any){
        this.navCtrl.push(CoursePage,{'course':course,'user':this.user});
    }
    joinByGroupId(){

    }
    getUserHeadIcon(){
        if(this.user != null && this.user != undefined)
        return Configuration.DOMAIN_PROJECT + this.user.headIcon;
        return ;
    }
    getCourseIcon(course:any){
        //console.log(Configuration.DOMAIN_PROJECT + course.cIcon);
        if(course != null && course != undefined)
        return Configuration.DOMAIN_PROJECT + course.cIcon;
        return ;    
    }
    myCourses(){
        this.navCtrl.push(MyCoursesPage,{user:this.user});
    }
  
}
