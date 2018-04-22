import { Component ,ChangeDetectorRef,ViewRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../service/storage.service';
import { Configuration } from '../../config/Configuration';
import { FileOptionsProvider } from '../../providers/file-options/file-options';
import { NoticeProvider } from '../../providers/notice/notice';
import { Events } from 'ionic-angular';
/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
    user : any;
    constructor(public events:Events,public changeDetector:ChangeDetectorRef,public notice:NoticeProvider,public fileOpt : FileOptionsProvider,public navCtrl: NavController, public navParams: NavParams,public storage : StorageService) {
       
    }
    initFileOptionProvider(){
        this.fileOpt.uploadApi=Configuration.DOMAIN_PROJECT + 'upload/headIcon/s/'+ this.user.stuId;
        this.fileOpt.upload.success = (data)=>{
            if(data.code == Configuration.SUCCESS){
                this.notice.showToast('上传头像成功！');
                this.user = data.extend.student;
                this.storage.write('user',this.user);
                if(!(this.changeDetector as ViewRef).destroyed)
                    this.changeDetector.detectChanges();
                this.events.publish(Configuration.USER_CHANGE_EVENT,{
                    'user':this.user
                });
            }else if(data.code == Configuration.UPLOAD_HEAD_ERROR){
                this.notice.showToast(data.msg);
            }
        };
        this.fileOpt.upload.error = (data)=>{
            this.notice.showToast('ERROR:' + JSON.stringify(data));
        };
    }
    ionViewDidLoad() {

    }
    ionViewWillLoad() {
        this.storage.read('user').then((user)=>{
            this.user = JSON.parse(user);
        });
    }
    getHeadIconSrc(){
        if(this.user == null || this.user == undefined)
            return ;
        return Configuration.DOMAIN_PROJECT + this.user.headIcon;
    }
    changeHeadIcon(){
        if(this.user == null || this.user == undefined)
            return ;
        this.initFileOptionProvider();
        this.fileOpt.showPicActionSheet();
    }
}
