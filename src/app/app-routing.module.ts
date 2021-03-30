import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnnotationsComponent } from './annotations/annotations.component';
//import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { WordComponent } from './word/word.component';
import { WordsComponent } from './words/words.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'}, 
  { path: 'login', component: LoginComponent }, 
  { path: 'annotation', component: AnnotationComponent, canActivate: [AuthService] },
  { path: 'annotations', component: AnnotationsComponent, canActivate: [AuthService] },
  { path: 'category', component: CategoryComponent, canActivate: [AuthService] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthService] },
  { path: 'word', component: WordComponent, canActivate: [AuthService] },
  { path: 'word/:id', component: WordComponent, canActivate: [AuthService] },
  { path: 'words', component: WordsComponent, canActivate: [AuthService] },
  { path: '**', redirectTo: 'login'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
