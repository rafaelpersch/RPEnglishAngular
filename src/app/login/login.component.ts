import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Login } from '../models/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  
  model = new Login();
  year: number =  (new Date()).getFullYear();
  disabled: boolean = false;
  applicationMessage: string = '';

  constructor(toastr: ToastrService) { super(toastr); }

  ngOnInit(): void {
  }

  onLogin(): void {
    //this.disabled = !this.disabled;
    this.applicationMessage = "hehe";
    this.showSuccess('haha foi', 'title');
    //this.showError('heheh', 'title n');
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

}
