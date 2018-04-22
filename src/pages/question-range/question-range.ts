import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service';
/**
 * Generated class for the QuestionRangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-range',
  templateUrl: 'question-range.html',
})
export class QuestionRangePage {
  course:any;
  students = [];
    constructor(public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.http.request('teacher/getStudentsByCIdOrderByScore','get',{cId:this.course.cId}).then(result=>{
          if(result.code == Configuration.SUCCESS){
              this.students = result.extend.students;
            }
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionRangePage');
  }
  getImgSrc(path:string){
      return Configuration.DOMAIN_PROJECT + path;
  }
}
