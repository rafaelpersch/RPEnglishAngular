import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { Login } from '../models/login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  model = new Login();
  year: number =  (new Date()).getFullYear();
  applicationMessage: string = '';
  clickSubmit:boolean = false;

  constructor(private authService:AuthService, private formBuilder: FormBuilder, toastr: ToastrService) { 
    super(toastr); 

    this.loginForm = this.formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });    
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.clickSubmit = true;

    if (!this.loginForm.valid){
      return;
    }

    this.showProgress();

    this.authService.postLogin(this.model).subscribe((response: any) => {
      this.hideProgress();
      this.authService.signIn(response);
    },
    error => {
      console.warn(error);
      
      if (error.status === 401){
        this.applicationMessage = error.error;
      }else{
        this.applicationMessage = 'Ops!';
      }
      
      this.hideProgress();
    });   
  }  
}