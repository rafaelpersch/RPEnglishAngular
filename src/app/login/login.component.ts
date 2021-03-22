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

    //this.applicationMessage = "hehe";
    //this.showSuccess('haha foi', 'title');
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

    /*this.authService.postLogin(this.model).then((response: any) => {
        this.hideProgress();
        if (response.message != null) {
            this.showWarning(response.message);
        } else {
            
            this.registerMenu();
        }
    }).catch(err => {
        this.hideProgress();
        console.log(err);
        if (err.status === 404) {
            this._matSnackBar.open('Usuário não cadastrado', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
        } else {
            this._matSnackBar.open('Houve um erro ao processar sua requisição', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
        }
    });*/    
  }  
}
