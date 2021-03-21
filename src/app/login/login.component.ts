import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { Login } from '../models/login';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(private formBuilder: FormBuilder, toastr: ToastrService) { 
    super(toastr); 

    this.loginForm = this.formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });    
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.applicationMessage = "hehe";
    this.showSuccess('haha foi', 'title');
    /*this.showProgress();
    this._service.login(this.model).then((response: any) => {
        this.hideProgress();
        if (response.message != null) {
            this.showWarning(response.message);
        } else {
            this._service.signIn(response.data);
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

  onSubmit(): void {
    this.clickSubmit = true;
    if (!this.loginForm.valid){
      return;
    }
    console.warn('Your order has been submitted', this.loginForm.value);
    //this.loginForm.reset();
  }  
}
