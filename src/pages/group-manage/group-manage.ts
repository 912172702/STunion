import { Component ,ViewRef,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController} from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { StorageService } from '../../service/storage.service';
import { Configuration } from '../../config/Configuration';
import { Student } from '../../entity/student';
import { FileOptionsProvider } from '../../providers/file-options/file-options';
import { NoticeProvider } from '../../providers/notice/notice';
import { Events,ActionSheetController,AlertController } from 'ionic-angular';
import { NotificationHistoryPage } from '../../pages/notification-history/notification-history';
import { QuestionRangePage } from '../../pages/question-range/question-range';
import { ShowMemberDetailPage } from '../../pages/show-member-detail/show-member-detail';
/**
 * Generated class for the GroupManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-manage',
  templateUrl: 'group-manage.html',
})
export class GroupManagePage {
    course:any;
    students = [];
    rowCount = 5;
    image='assets/icon/defaulthead.jpg';
    constructor(public popOver:PopoverController,public alertCtrl:AlertController,public actionSheetCtrl:ActionSheetController,public changeDetector :ChangeDetectorRef,public events:Events,public fileOpt:FileOptionsProvider,public notice:NoticeProvider,public http:HttpService,public storage:StorageService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');   
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupManagePage');
        this.http.request('student/getStudentsByCourseId','get',{'cId':this.course.cId}).then(data=>{
            if(data.code == Configuration.SUCCESS){
                this.students = data.extend.students;
            }
        });
    }
    getRowCountRange(){
        let row = Math.ceil(this.students.length / this.rowCount);
        let rowC = [];
        for(let i = 0 ; i < row; i++)
            rowC.push(i);
        return rowC;
    }

    getStudentRow(index:number){
        let first = this.rowCount * index;
        let row = [];
        for(let i = first; i < this.students.length && i < first + this.rowCount; i++)
            row.push(this.students[i]);
        let buyu = row.length;
        for(let i = buyu; i < this.rowCount; i++)
            row.push(new Student());
        return row;
    }

    getImageSrc(src:string){
        return Configuration.DOMAIN_PROJECT + src;
    }
    getSimpleName(stuName:string){
        if(stuName == undefined) return;
        if(stuName.length < 6) return stuName;
        return stuName.substr(0,6) + '...';
    }
     showDetail(stu:any){
        this.popOver.create(ShowMemberDetailPage,{student:stu}).present();
    }
    getCourseIconSrc(){
        if(this.course == undefined || this.course == null)
            return;
        console.log('getCourseIconSrc : '+JSON.stringify(this.course));
        return Configuration.DOMAIN_PROJECT + this.course.cIcon;
    }

    initFileOpt(){
        this.fileOpt.uploadApi = Configuration.DOMAIN_PROJECT + 'upload/courseIcon/'+this.course.cId;
         this.fileOpt.upload.success = (data)=>{
            if(data.code == Configuration.SUCCESS){
                this.course = data.extend.course;
                this.events.publish(Configuration.COURSE_CHANGE_EVENT,{
                    'course':this.course                       
                });
                if(!(this.changeDetector as ViewRef).destroyed)
                    this.changeDetector.detectChanges();
            }else if(data.code == Configuration.UPLOAD_HEAD_ERROR){
                this.notice.showToast(data.msg);
            }
        };
        this.fileOpt.upload.error = (data)=>{
            this.notice.showToast('ERROR:' + JSON.stringify(data));
        };
    }

    noteHistory(){
        this.navCtrl.push(NotificationHistoryPage,{course:this.course});
    }
    questionRange(){
        this.navCtrl.push(QuestionRangePage,{course:this.course});
    }
}
