import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDayComponent } from './pages/all-day/all-day.component';
import { BreakfastComponent } from './pages/breakfast/breakfast.component';
import { LunchComponent } from './pages/lunch/lunch.component';
import { DinnerComponent } from './pages/dinner/dinner.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { RecipeTableComponent } from './components/recipe-table/recipe-table.component';
import { CategoryContainerComponent } from './components/category-container/category-container.component';
import { AuthRedirectComponent } from './pages/auth-redirect/auth-redirect.component';


const routes: Routes = [
  {path:'auth-redirect', component: AuthRedirectComponent},
  { path: '', redirectTo: '/allDay', pathMatch: 'full' },  // this is the route for allDay
  { path: 'allDay', component:  AllDayComponent}, // this is the route for allDay
  { path: 'BreakFast', component:  BreakfastComponent},
  { path: 'Lunch', component:  LunchComponent},
  { path: 'Dinner', component:  DinnerComponent},
  { path: 'category', component:  CategoryTableComponent},
  { path: 'recipe', component:  RecipeTableComponent},
  { path: 'viewMenu', component:  CategoryContainerComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }