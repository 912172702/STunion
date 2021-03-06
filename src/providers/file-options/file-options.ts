import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActionSheetController } from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject }from'@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { NoticeProvider } from '../../providers/notice/notice';

/*
  Generated class for the FileOptionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileOptionsProvider {
    // 调用相机时传入的参数
    private cameraOpt = {
        quality: 50,
        destinationType: 1, 
        // Camera.DestinationType.FILE_URI,
        sourceType: 1, 
        // Camera.PictureSourceType.CAMERA,
        encodingType: 0, 
        // Camera.EncodingType.JPEG,
        mediaType: 0, 
        // Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };

    // 调用相册时传入的参数
    private imagePickerOpt = {
        maximumImagesCount: 1,//选择一张图片
        width: 800,
        height: 800,
        quality: 80
    };

    // 图片上传的的api
    public uploadApi:string;

    upload: any= {
        fileKey: 'upload',//接收图片时的key
        fileName: 'imageName.jpg',
        headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'//不加入 发生错误！！
        },
        params: {}, 
        //需要额外上传的参数
        success: (data)=> { },//图片上传成功后的回调
        error: (err)=> { },//图片上传失败后的回调
        listen: ()=> { }//监听上传过程
    };


    constructor(
        public http: Http,
        private actionSheetCtrl:ActionSheetController,
        private camera:Camera,
        private imagePicker:ImagePicker,
        private transfer:FileTransfer,
        private file:File,
        private fileTransfer:FileTransferObject,
        private noticeProvider:NoticeProvider
        ) {
            this.fileTransfer=this.transfer.create();
    }

    showPicActionSheet() {
        this.useASComponent();
    }

    // 使用ionic中的ActionSheet组件
    private useASComponent() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '选择',
            buttons: [
                {
                    text: '拍照',
                    handler: () => {
                        this.startCamera();
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: () => {
                        this.openImgPicker();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    // 启动拍照功能
    private startCamera() {
        this.camera.getPicture(this.cameraOpt).then((imageData) => {
           this.uploadImg(imageData);
        }, (err) => {
           this.noticeProvider.showToast('ERROR:' + err); //错误：无法使用拍照功能！
        });
    }
      
    public openImgPickerWithoutUpload():Promise<any>{
        return this.imagePicker.getPictures(this.imagePickerOpt);
    }

    // 打开手机相册
    public openImgPicker(){
        let temp = '';
         console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+JSON.stringify(this.imagePicker));
        this.imagePicker.getPictures(this.imagePickerOpt).then((results)=> {
            for (var i=0; i< results.length; i++) {
                temp = results[i];
            }
            this.uploadImg(temp);
        }, (err)=> {
            this.noticeProvider.showToast('ERROR:'+ err);//错误：无法从手机相册中选择图片！
        });
    }

    // 上传图片
    public uploadImg(path:string) {
        if (!path) return;
        let options:any;
        options = {
            fileKey: this.upload.fileKey,
            headers: this.upload.headers,
            params: this.upload.params
        };
        console.log('path:'+ path);
        this.fileTransfer.upload(path,this.uploadApi, options).then((data)=> {
            if (this.upload.success) 
                this.upload.success(JSON.parse(data.response));
        }, (err) => {
            if (this.upload.error) 
                this.upload.error(err);
            else
                this.noticeProvider.showToast('错误：上传失败！');
        });
    }

    // 停止上传
    stopUpload() {
        if (this.fileTransfer) {
            this.fileTransfer.abort();
        }
    }

}
