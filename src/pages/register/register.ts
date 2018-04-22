import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../service/storage.service';
import { HttpService } from '../../service/http.service';
import { Http } from '@angular/Http';   
import { Configuration } from '../../config/Configuration';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
   school: any;
   schoolId: any;
   colleges = [];
   college: any;
   parentRelation: any;
   parentTel: any;
   province: string;
   provinces = [];
   jsonData = [];
    constructor(private alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams,private local:StorageService,private http:HttpService) {
    }

    ionViewWillEnter() {
        console.info("load...");
        this.http.getLocal('assets/json/school.json').then(
            data=>{
                this.jsonData = data;
                for (let key in this.jsonData)
                    this.provinces.push(key);
            }
        );
  }
  
    schoolChange(){
        this.http.request('user/school', 'get', { name: this.school }).then(
            data=>{
                let res = data;
                console.log(res);
                if (res.code == Configuration.SUCCESS){
                    this.schoolId = res.extend.schoolId;
                    this.colleges = res.extend.colleges;               
                }
                else{
                    this.alertCtrl.create({
                        title:'提示',
                        message:res.msg,
                        buttons:['确定'],
                    }).present();
                }
            }
        );
    }

  //注册提交
    submit(name, number, tel, psw) {
        let data = {};
        let url = 'user/sign/s'
       
            data = {
                stuName:name.value,
                schId:this.schoolId,
                colId:this.college,
                stuNumber: number.value,
                stuTel: tel.value,
                password: psw.value,
                parentTel: this.parentTel,
                parentRelation: this.parentRelation
            }
    
        this.http.request(url,'post',data).then(
            data=>{
                if(data.code == Configuration.SUCCESS){
                    this.local.write('user', data.extend.user);
                    this.navCtrl.push(LoginPage);
                }else{
                    this.alertCtrl.create({
                    title: '注册失败',
                    message: data.msg,
                    buttons: ['确定'],
                    }).present();
                }
            }
        );   
    }
}
