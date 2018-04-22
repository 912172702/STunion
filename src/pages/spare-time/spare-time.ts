import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service';
import { NoticeProvider } from '../../providers/notice/notice';
/**
 * Generated class for the SpareTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spare-time',
  templateUrl: 'spare-time.html',
})
export class SpareTimePage {
    course:any;
    timeStr:string;
    courseTable = new Array(7);
    spareTimes = [];
    row = [0,1,2,3,4,5,6];
    col = [0,1,2,3,4,5,6,7,8,9,10,11]; 
    constructor(public notice:NoticeProvider,public alertCtrl:AlertController,public http : HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.timeStr = this.navParams.get('timeStr');
        this.initArrays();
    }
     initArrays(){
        for(let i = 0; i < 7; i++){
            this.courseTable[i] = new Array(Configuration.MORNING_COURSE_COUNT + Configuration.AFTERNOON_COURSE_COUNT + Configuration.AFTERNOON_COURSE_COUNT);
            for(let j = 0 ; j < this.courseTable[i].length; j++){
                this.courseTable[i][j] = 0;
            }
        }
        //
        let timeArray = this.timeStr.split(';');
        for(let i = 0; i < timeArray.length; i++){
            if(timeArray[i] != ''){
                let day_index = timeArray[i].split(',');
                this.courseTable[+day_index[0]][+day_index[1]] = 1; 
            }
        }
    }
    ionViewDidLoad() {
    console.log('ionViewDidLoad SpareTimePage');
    }
    getBackgroundColor(row:number,col:number){
        if(this.courseTable[row] == undefined || this.courseTable[row][col] == undefined)
            return;
        if(this.courseTable[row][col] == 0)
            return '#fffff8';
        else if(this.courseTable[row][col] == 1)
            return '#B3EE3A';
        else if(this.courseTable[row][col] == 2)
            return '#4B0082';
    }
    clickItem(row:number,col:number){
        if(this.courseTable[row][col] == 0)
            return;
        else if(this.courseTable[row][col] == 1)
            this.courseTable[row][col] = 2;
        else if(this.courseTable[row][col] == 2)
            this.courseTable[row][col] = 1;
    }
    submitSpare(){
        let timeStr = '';
        for(let i = 0 ; i < 7; i++)
            for(let j = 0; j < this.courseTable[i].length; j++){
                if(this.courseTable[i][j] == 2){
                    timeStr += i+','+j+';';
                }
            }

        this.http.request('student/spareTime','post',{cId:+this.course.cId,timeStr:timeStr}).then(data=>{
            if(data.code == Configuration.SUCCESS){
                this.notice.showToast('提交成功！');
                this.navCtrl.pop();
            }
        });
    }

}
