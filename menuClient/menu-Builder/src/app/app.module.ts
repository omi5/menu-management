import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// For Sidebar 
// import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


//For Sidebar
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginFormComponent } from './login-form/login-form.component';


//For LoginForm
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSiderComponent } from './components/nz-sider/nz-sider.component';
import { NzHeaderForTriggerComponent } from './components/nz-header-for-trigger/nz-header-for-trigger.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { AllDayComponent } from './components/scheduleTime/all-day/all-day.component';
import { BreakfastComponent } from './components/scheduleTime/breakfast/breakfast.component';
import { LunchComponent } from './components/scheduleTime/lunch/lunch.component';
import { DinnerComponent } from './components/scheduleTime/dinner/dinner.component';
import { MenuItemComponent } from './components/scheduleTime/menu-item/menu-item.component';



registerLocaleData(en);



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginFormComponent,
    ScheduleFormComponent,
    NzSiderComponent,
    NzHeaderForTriggerComponent,
    ModalFormComponent,
    AllDayComponent,
    BreakfastComponent,
    LunchComponent,
    DinnerComponent,
    MenuItemComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    AppRoutingModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzModalModule,
    NzUploadModule
    


  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
