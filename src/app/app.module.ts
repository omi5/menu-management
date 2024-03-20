import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//Modules
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

// Ng-Zorro-Antd modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NavbarComponent } from './components/navbar/navbar.component';

//Splash logo
import {SpashLogoComponent} from './components/spash-logo/spash-logo.component'
import { AuthService } from '../app/interceptors/auth/auth.service';
import { TokenService } from './interceptors/token/token.service';

//components
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { RecipeTableComponent } from './components/recipe-table/recipe-table.component';
import { CategoryContainerComponent } from './components/category-container/category-container.component';
import { AuthRedirectComponent } from './pages/auth-redirect/auth-redirect.component';
import { EditMenuItemComponent } from './components/edit-menu-item/edit-menu-item.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { NzHeaderForTriggerComponent } from './components/nz-header-for-trigger/nz-header-for-trigger.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { AllDayComponent } from './pages/all-day/all-day.component';
import { BreakfastComponent } from './pages/breakfast/breakfast.component';
import { LunchComponent } from './pages/lunch/lunch.component';
import { DinnerComponent } from './pages/dinner/dinner.component';
import { MenuItemComponent } from './pages/menu-item/menu-item.component';
import { CreateMenuFormComponent } from './components/create-menu-form/create-menu-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NzSiderComponent } from './components/nz-sider/nz-sider.component'; 


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NzSiderComponent,
    NzHeaderForTriggerComponent,
    ModalFormComponent,
    AllDayComponent,
    BreakfastComponent,
    LunchComponent,
    DinnerComponent,
    MenuItemComponent,
    CreateMenuFormComponent,
    RecipeFormComponent,
    CategoryFormComponent,
    CategoryTableComponent,
    RecipeTableComponent,
    CategoryContainerComponent,
    NavbarComponent,
    AuthRedirectComponent,
    SpashLogoComponent,
    EditMenuItemComponent
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
    NzMessageModule,
    NzSpinModule
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
