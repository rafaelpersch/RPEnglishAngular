import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnnotationsComponent } from './annotations/annotations.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { WordComponent } from './word/word.component';
import { WordsComponent } from './words/words.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationComponent,
    AnnotationsComponent,
    CategoryComponent,
    CategoriesComponent,
    WordComponent,
    WordsComponent,
    LayoutComponent,
    LoginComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
