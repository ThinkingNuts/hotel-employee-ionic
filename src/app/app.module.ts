import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { EmployeeListPage } from '../pages/employee-list/employee-list';
import { InfoListPage } from '../pages/info-list/info-list';
import { MyPage } from '../pages/my/my';
import { ApplyRecordsPage } from '../pages/apply-records/apply-records';

import { AreaSelectorComponent } from '../components/area-selector/area-selector';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BaseHttpServiceProvider } from '../providers/base-http-service/base-http-service';
import { Device } from '@ionic-native/device';
import { AppNativeDeviceProvider } from '../providers/app-native-service/app-native-device';
import { AppUrlConfigProvider } from '../providers/app-url-config/app-url-config';
import { AccountProvider } from '../providers/account/account';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    MyPage,
    EmployeeListPage,
    InfoListPage,
    HomePage,
    ApplyRecordsPage,
    AreaSelectorComponent
  ],
  imports: [
    HttpModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    HomePage,
    EmployeeListPage,
    InfoListPage,
    MyPage,
    AreaSelectorComponent
  ],
  providers: [
    AccountProvider,
    Device,
    AppNativeDeviceProvider,
    BaseHttpServiceProvider,
    AppUrlConfigProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
