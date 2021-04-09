import { Component } from '@angular/core';
import { BaseHttpService } from './services/base-http.service';
import { Car } from './models/car';
import { NgForm } from '@angular/forms';
import { AnnotationService } from './services/annotation.service';
import { Annotation } from './models/annotation';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RPEnglishAngular';

  car = {} as Car;
  cars: Car[] = [];
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private location:Location){
    this.isAuthenticated = authService.isAuthenticated();

    if (this.isAuthenticated){
      if(this.location.path() === '' || 
         this.location.path() === '/login'){
          window.location.href = '/annotations';
        
      }
    }
  }
  
  ngOnInit() {
  }
}