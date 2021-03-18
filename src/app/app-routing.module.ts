import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationsComponent } from './annotations/annotations.component';
import { AppComponent } from './app.component';

const routes: Routes = [  {
  path: '',
  component: AppComponent,
  //canActivate: [AuthService],
}, {
  path: 'login',
  component: AppComponent,
}, {
  path: 'annotations',
  component: AnnotationsComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
