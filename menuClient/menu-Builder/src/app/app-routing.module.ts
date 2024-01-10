import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AllDayComponent } from './components/scheduleTime/all-day/all-day.component';
import { BreakfastComponent } from './components/scheduleTime/breakfast/breakfast.component';
import { LunchComponent } from './components/scheduleTime/lunch/lunch.component';
import { DinnerComponent } from './components/scheduleTime/dinner/dinner.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';


// Import other components and create your routes

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'dashboard', component:  SidebarComponent},
  { path: 'allDay', component:  AllDayComponent},
  { path: 'breakfast', component:  BreakfastComponent},
  { path: 'lunch', component:  LunchComponent},
  { path: 'dinner', component:  DinnerComponent},
  { path: 'category', component:  CategoryTableComponent},
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }