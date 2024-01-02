import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginFormComponent } from './login-form/login-form.component';


// Import other components and create your routes

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'dashboard', component:  SidebarComponent},
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }