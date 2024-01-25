import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AllDayComponent } from './components/scheduleTime/all-day/all-day.component';
import { BreakfastComponent } from './components/scheduleTime/breakfast/breakfast.component';
import { LunchComponent } from './components/scheduleTime/lunch/lunch.component';
import { DinnerComponent } from './components/scheduleTime/dinner/dinner.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { ScheduleTimeTableComponent } from './components/schedule-time-table/schedule-time-table.component';
import { MakeRecipeTableComponent } from './components/make-recipe-table/make-recipe-table.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestIngredientsComponent } from './test-ingredients/test-ingredients.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';


// Import other components and create your routes

const routes: Routes = [
  // { path: '', component: LoginFormComponent },
  // { path: 'dashboard', component:  SidebarComponent},
  {path:'auth-redirect', component: AuthRedirectComponent},
  { path: '', redirectTo: '/allDay', pathMatch: 'full' },  // this is the route for allDay
  { path: 'allDay', component:  AllDayComponent}, // this is the route for allDay
  { path: 'BreakFast', component:  BreakfastComponent},
  { path: 'Lunch', component:  LunchComponent},
  { path: 'Dinner', component:  DinnerComponent},
  { path: 'category', component:  CategoryTableComponent},
  { path: 'recipe', component:  MakeRecipeTableComponent},
  { path: 'schedule', component:  ScheduleTimeTableComponent},
  { path: 'viewMenu', component:  TestComponentComponent},
  { path: 'ingredients', component:  TestIngredientsComponent},

  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }