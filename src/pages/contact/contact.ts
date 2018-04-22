import { Component ,ElementRef,ViewChild} from '@angular/core';
import { NavController ,NavParams,Events,Keyboard} from 'ionic-angular';
import { StorageService } from '../../service/storage.service';
import { HttpService } from '../../service/http.service'; 
import { CreateNewsPage } from '../../pages/create-news/create-news';
import { Configuration } from '../../config/Configuration';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
    user:any;
    newses = [];
    showFooter = false;
    commentContent='';
    readyNews:any;
    @ViewChild("commentInput") commentInput:ElementRef;
    cInput:any;
    display = 'none';
    constructor(public ele:ElementRef,public keyBoard:Keyboard,public events:Events,public http:HttpService,public storage:StorageService,public navCtrl: NavController,public navParams:NavParams) {
        this.storage.read('user').then(user=>{
            this.user = JSON.parse(user);
        }).then(()=>{
            this.getData();
        });
        this.events.subscribe(Configuration.NEWS_ADD_EVENT,(data)=>{
            console.log(JSON.stringify(data.news));
            this.newses.unshift(data.news);
        });
        
    }
    getData(){
        return this.http.request('/news/all/' + this.user.schId,'get',{}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.newses = result.extend.newses;
            }
        });
    }
    ionViewDidLoad() {
       this.cInput = this.commentInput.nativeElement;
       this.cInput.onblur=()=>{
             setInterval(()=>{
               this.display = 'none';
             },100)
       }
    }
    addNews(){
        this.navCtrl.push(CreateNewsPage,{user:this.user});
    }
    getImgSrc(path:string){
        return Configuration.DOMAIN_PROJECT + path; 
    }
    startComment(news:any){
       this.display = '';
       this.cInput.focus();
       this.readyNews = news;
    }
    submitComment(){
        this.http.request('news/addComment/'+Configuration.USRE_TYPE_STUDENT,'post',{userId:this.user.stuId,newsId:this.readyNews.news.newsId,content:this.commentContent}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                let comment = {
                    username:this.user.stuName,
                    comment:{
                        content:this.commentContent
                    }
                };
                this.readyNews.comments.push(comment);
                this.commentContent = '';
            }
        });
    }
    doRefresh(refresher){
        this.getData().then(()=>{
            setTimeout(() => {
                console.log('Async operation has ended');
                refresher.complete();
            }, 1000);
        })
    }
}
