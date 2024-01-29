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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ItemRecipeFormComponent } from './item-recipe-form/item-recipe-form.component';

//For Drawer 
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AddIngredientsFieldComponent } from './add-ingredients-field/add-ingredients-field.component';
import { ItemDetailsComponent } from './components/scheduleTime/item-details/item-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';



// Ng-Zorro-Antd modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'; // For Popconfirm
import { ScheduleTimeTableComponent } from './components/schedule-time-table/schedule-time-table.component';
import { MakeRecipeTableComponent } from './components/make-recipe-table/make-recipe-table.component';
import { EditMenuItemComponent } from './edit-menu-item/edit-menu-item.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestIngredientsComponent } from './test-ingredients/test-ingredients.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';

//Splash logo
import {SpashLogoComponent} from './components/spash-logo/spash-logo.component'

import { AuthService } from '../app/interceptors/auth/auth.service';
import { TokenService } from './interceptors/token/token.service';






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
    ItemRecipeFormComponent,
    AddIngredientsFieldComponent,
    ItemDetailsComponent,
    RecipeFormComponent,
    CategoryFormComponent,
    CategoryTableComponent,
    ScheduleTimeTableComponent,
    MakeRecipeTableComponent,
    EditMenuItemComponent,
    TestComponentComponent,
    TestIngredientsComponent,
    NavbarComponent,
    AuthRedirectComponent,
    SpashLogoComponent
   
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
    NzUploadModule,
    NzDrawerModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTableModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzTimePickerModule,
    NzDropDownModule,
    
   
    


  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
