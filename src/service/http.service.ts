import { Configuration } from '../config/Configuration';
import { Http, Headers, } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HttpService{

    constructor(public http:Http){
        console.log('新建 HttpService');
    }

    request(url:string, method:string, params){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        let options = { headers: headers };
        return this.http.post(Configuration.DOMAIN + Configuration.PROJECT + url + '?_method=' + method,this.toQueryString(params), options)
        .toPromise()
        .then((response)=>response.json())
        .catch((err)=>this.catchError(err));
    }
   
    getLocal(url:string){
        return this.http.get(url)
        .toPromise()
        .then(response=>response.json()).catch(err=>this.catchError(err));
    }

    private toQueryString(data){
        let res = [];
        for(let key in data){
            let pair = key + '=' + data[key];
            res.push(pair);
        }
        return res.join('&');
    }

   catchError(err:any):Promise<any>{
       console.log('ERROR:');
       console.log(err);
       return Promise.reject(err || err.message)
       //我们还要通过一个被拒绝 (rejected) 的承诺来把该错误用一个用户友好的格式返回给调用者， 以便调用者能把一个合适的错误信息显示给用户。
    }
   
}
