import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service';
import { StorageService } from '../../service/storage.service';
import { Events } from 'ionic-angular';
import { Message } from '../../bean/message';
/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketProvider {

    user:any;
    ws:WebSocket;
    constructor(public http:HttpService,public events:Events,public storage:StorageService) {
        console.log('Hello WebsocketProvider Provider');
        this.init();
    }

    init(){
        this.storage.read('user').then((user) =>{
            if(user != null){
                this.user = JSON.parse(user);
                this.connect();
            }else{
                console.log('用户不存在');
            }
        });
    }

    connect(){
        let url:string = 'ws://'+Configuration.IP_PORT+Configuration.PROJECT+Configuration.WEBSOCEET_TOKEN+'/s/'+this.user.stuId;
        console.log('url :'+url);
        this.ws = new WebSocket(url);
        switch (this.ws.readyState) {
            case WebSocket.CONNECTING:
                console.log('正在连接....');
                break;
            case WebSocket.OPEN:
                console.log('链接成功....');
                break;
            case WebSocket.CLOSING:
                console.log('正在关闭....');
                break;
            case WebSocket.CLOSED:
                console.log('已关闭....');
                break;
            default:
                break;
        }
        let that = this;
        this.ws.onopen = function(){
            this.send('Hello! I am caohui');
        }
        this.ws.onclose = function(event){

            console.log('close..\nreason : '+event.reason);
        }
        this.ws.onmessage = function(event){
            let msg:Message = JSON.parse(event.data);
            console.log('接收到消息...'+JSON.stringify(msg));
            switch (msg.code) {
                case Configuration.SIMPLE_CALL_ROLL:
                    that.events.publish(Configuration.SIMPLE_CALL_ROLL_EVENT,{'time':msg.extend['time'],'cId':msg.extend['cId']});
                    break;
                case Configuration.SPARE_TIME:
                    that.publishEvent(Configuration.SPARE_TIME_EVENT,{cId:msg.extend['cId'],timeStr:msg.extend['timeStr']});
                    break;
                case Configuration.NORMAL_NOTIFICATION:
                    that.publishEvent(Configuration.NORMAL_NOTIFICATION_EVENT,{cId:msg.extend['cId'],notification:msg.extend['notification']});
                    break;
                case Configuration.COURSE_APPLY:
                    that.publishEvent(Configuration.COURSE_APPLY_EVENT,{cId:msg.extend['cId'],courseApply:msg.extend['courseApply']});
                    break;
                case Configuration.PUBLISH_QUESTION:
                    that.publishEvent(Configuration.PUBLISH_QUESTION_EVENT,{question:msg.extend['question'],cId:msg.extend['cId']})
                    break;
                case Configuration.ANSWER_RESULT:
                    that.publishEvent(Configuration.ANSWER_RESULT_EVENT,{isRight:msg.extend['isRight'],cId:msg.extend['cId']});
                    break;
                case Configuration.STOP_QUESTION:
                    that.publishEvent(Configuration.STOP_QUESTION_EVENT,{});
                default:
                    console.log('接收到未分类消息..'+JSON.stringify(event.data));
                    break;
            }
        }
        this.ws.onerror = function(event){
            console.log('WebSocket ERROR:' + JSON.stringify(event));
        }
    }

    publishEvent(tag:string,data:any){
        this.events.publish(tag,data,Date.now());
    }
    send(msg:string){
        this.ws.send(msg);
    }

    close(){
        this.ws.close();
    }
}
