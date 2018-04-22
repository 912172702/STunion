import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { OptionsPage } from '../options/options';
import { StorageService } from '../../service/storage.service';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots : Object[];
  constructor() {
   this.tabRoots = [
      {
         root:HomePage,
         tabTitle:'班级列表',
         tabIcon:'home',
      },
      {
         root:ContactPage,
         tabTitle:'校友圈',
         tabIcon:'contacts',
      },
      {
         root:OptionsPage,
         tabTitle:'设置',
         tabIcon:'ios-settings',
      },
   ];
  }
}
