import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StorageService } from '../../service/storage.service';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    tel: any;
    psw: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpService, public local: StorageService, private alertCtrl: AlertController) { }

    ionViewWillEnter() {
        this.local.read('user').then((value) => {
            if (value && value != undefined && value != null) {
                let user: any = JSON.parse(value);
                this.psw = user.password;
                this.tel = user.stuTel;
            }
        });
    }

    login() {
        let data = {
            tel: this.tel,
            psw: this.psw,
        }
        this.http.request('user/login/s', 'post', data).then(
            data => {
                var result = data;
                console.info(result);
                if (result.code == Configuration.SUCCESS) {
                    //保存
                    this.local.write('user', result.extend.user);
                    this.navCtrl.push(TabsPage);
                }
                else {
                    this.alertCtrl.create({
                        title: '提示',
                        message: '用户名或密码错误！',
                        buttons: ['确定'],
                    }).present();
                }
            }
        );

    }
    sign() {
        this.navCtrl.push(RegisterPage);
    }
}
