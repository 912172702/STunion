import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
@Injectable()
export class StorageService{
  
   constructor(private storage:Storage){}
   
   write(key:string,value:any){
      this.storage.set(key, JSON.stringify(value));
      return this;
   }

   read(key:string){
      let value = this.storage.get(key);
      if(value && value != undefined && value != null){
         return value;
      }  
      return null;
   }
   
   remove(key:string){
      this.storage.remove(key);
      return this;
   }

   clear(){
      sessionStorage.clear();
   }
}