import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service';
/**
 * Generated class for the CreateNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-news',
  templateUrl: 'create-news.html',
})
export class CreateNewsPage {
    user:any;
    newsContent='';
    constructor(public events:Events,public http :HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.user = this.navParams.get('user');
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNewsPage');
    }
    submit(){
        this.http.request('news/add/'+Configuration.USRE_TYPE_STUDENT,'post',{content:this.newsContent,userId:this.user.stuId,schId:this.user.schId}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.events.publish(Configuration.NEWS_ADD_EVENT,{news:result.extend.news});
                this.navCtrl.pop();
            }
        });
    }
}
