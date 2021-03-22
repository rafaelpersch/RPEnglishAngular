import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationsComponent } from './annotations/annotations.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'}, 
  { path: 'login', component: LoginComponent }, 
  { path: 'annotations', component: AnnotationsComponent, canActivate: [AuthService], }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
