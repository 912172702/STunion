import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NoticeProvider {
    static TOAST_POS_BOTTOM: string = 'bottom';
    static TOAST_POS_MIDDLE: string = 'middle';

    constructor(private toastCtrl: ToastController) {
    }

    // 显示 toast提示
    showToast(message: string, position?: string) {
        if(position == null || position == undefined)
            position = NoticeProvider.TOAST_POS_BOTTOM;
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2500,
            position: position
        });
        toast.present();
        return toast;
    }

    showNoticeByToast(code: Number, msg: string) {
        let m = '';
        if(msg && msg.length > 0) {
            if(msg.charAt(msg.length - 1) == '!' || msg.charAt(msg.length - 1) == '！') {
                msg = msg.substr(0, msg.length - 1);
            }
        }
        if(code == 1) {
            m = '提示：' + msg + '！';
        } else {
            m = '错误' + code + '：' + msg + '！';
        }
        return this.showToast(m);
    }
}