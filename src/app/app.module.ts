import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnnotationsComponent } from './annotations/annotations.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { WordComponent } from './word/word.component';
import { WordsComponent } from './words/words.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';
import { ContentComponent } from './content/content.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    BaseComponent,
    ContentComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
