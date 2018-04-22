import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule} from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { HttpService } from '../service/http.service';
import { StorageService } from '../service/storage.service';
import { RegisterPage } from '../pages/register/register';
import { WebsocketProvider } from '../providers/websocket/websocket'; 
import { JoinCoursePage } from '../pages/join-course/join-course';
import { Geolocation } from '@ionic-native/geolocation';
import { CoursePage } from '../pages/course/course';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileOptionsProvider } from '../providers/file-options/file-options';
import { NoticeProvider } from '../providers/notice/notice';
import { OptionsPage } from '../pages/options/options';
import { GroupManagePage } from '../pages/group-manage/group-manage';
import { CollRollPage } from '../pages/coll-roll/coll-roll';
import { SpareTimePage } from '../pages/spare-time/spare-time';
import { NotificationPage } from '../pages/notification/notification';
import { CourseApplyPage } from '../pages/course-apply/course-apply';
import { NotificationHistoryPage } from '../pages/notification-history/notification-history';
import { QuestionRangePage } from '../pages/question-range/question-range';
import { SchoolNewsPage } from '../pages/school-news/school-news';
import { CreateNewsPage } from '../pages/create-news/create-news';
import { ShowMemberDetailPage } from '../pages/show-member-detail/show-member-detail';
import { MyCoursesPage } from '../pages/my-courses/my-courses';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    JoinCoursePage,
    CoursePage,
    OptionsPage,
    GroupManagePage,
    CollRollPage,
    SpareTimePage,
    NotificationPage,
    CourseApplyPage,
    NotificationHistoryPage,
    QuestionRangePage,
    CreateNewsPage,
    ShowMemberDetailPage,
    MyCoursesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true'
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    JoinCoursePage,
    CoursePage,
    OptionsPage,
    GroupManagePage,
    CollRollPage,
    SpareTimePage,
    NotificationPage,
    CourseApplyPage,
    NotificationHistoryPage,
    QuestionRangePage,
    CreateNewsPage,
    ShowMemberDetailPage,
    MyCoursesPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    StorageService,
    WebsocketProvider,
    Geolocation,
    Camera,
    ImagePicker,
    File,
    FileTransfer,
    FileTransferObject,
    FileOptionsProvider,
    NoticeProvider
  ]
})
export class AppModule {}
